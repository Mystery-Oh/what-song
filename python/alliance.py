import os
import glob
import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import librosa
import numpy as np
import pymysql
from concurrent.futures import ProcessPoolExecutor, as_completed
import sys
import matplotlib.pyplot as plt
from dotenv import load_dotenv
import warnings


warnings.filterwarnings("ignore")

class EmotionCNN(nn.Module):
    def __init__(self):
        super(EmotionCNN, self).__init__()
        self.model = models.resnet18(weights=None)
        num_ftrs = self.model.fc.in_features
        self.model.fc = nn.Linear(num_ftrs, 2)

    def forward(self, x):
        return self.model(x)

global_model = None
global_device = None
global_transform = None
global_viridis = None

def init_worker(model_path):
    global global_model, global_device, global_transform, global_viridis
    global_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    global_model = EmotionCNN().to(global_device)
    global_model.load_state_dict(torch.load(model_path, map_location=global_device, weights_only=True))
    global_model.eval()
    global_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor()
    ])
    global_viridis = plt.get_cmap('viridis')

def process_features(audio_path):
    y, sr = librosa.load(audio_path, sr=22050)

    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    chroma_mean = np.mean(chroma, axis=1)

    major_profile = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])
    minor_profile = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])

    major_corrs = [np.corrcoef(chroma_mean, np.roll(major_profile, i))[0, 1] for i in range(12)]
    minor_corrs = [np.corrcoef(chroma_mean, np.roll(minor_profile, i))[0, 1] for i in range(12)]
    
    keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    best_major = np.argmax(major_corrs)
    best_minor = np.argmax(minor_corrs)

    if major_corrs[best_major] > minor_corrs[best_minor]:
        root_note = keys[best_major]
        scale = 'Major'
    else:
        root_note = keys[best_minor]
        scale = 'Minor'

    step = 500
    total_ms = int(len(y) / sr * 1000)
    
    arousal_preds = []
    valence_preds = []

    with torch.no_grad():
        for file_time in range(0, total_ms, step):
            start_sample = int(file_time * sr / 1000)
            end_sample = int((file_time + step) * sr / 1000)
            y_segment = y[start_sample:end_sample]
            
            if len(y_segment) < 11025:
                continue
                
            S = librosa.feature.melspectrogram(y=y_segment, sr=sr, n_mels=128, fmax=8000)
            S_dB = librosa.power_to_db(S, ref=np.max)
            
            S_dB_normalized = (S_dB - S_dB.min()) / (S_dB.max() - S_dB.min() + 1e-8)
            colored_image = global_viridis(S_dB_normalized)
            colored_image = np.flipud(colored_image)
            
            img = Image.fromarray((colored_image[:, :, :3] * 255).astype(np.uint8))
            
            input_tensor = global_transform(img).unsqueeze(0).to(global_device)
            
            output = global_model(input_tensor)
            arousal_preds.append(output[0][0].item())
            valence_preds.append(output[0][1].item())
            
    if not arousal_preds:
        return os.path.basename(audio_path), root_note, scale, 0.0, 0.0
        
    final_arousal = np.percentile(arousal_preds, 80)
    
    v_preds = np.array(valence_preds)
    p10 = np.percentile(v_preds, 10)
    p90 = np.percentile(v_preds, 90)
    trimmed_v = v_preds[(v_preds >= p10) & (v_preds <= p90)]
    final_valence = np.mean(trimmed_v) if len(trimmed_v) > 0 else np.mean(v_preds)
    
    return os.path.basename(audio_path), root_note, scale, final_valence, final_arousal

if __name__ == '__main__':
    load_dotenv()
    

    ############################################################ 경로

    audio_dir = './data'
    model_path = './best_model.pth'
    
    #############################################################

    db_host = os.getenv('DB_HOST')
    db_port = int(os.getenv('DB_PORT'))
    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD')
    db_name = os.getenv('DB_NAME')
    
    audio_files = glob.glob(os.path.join(audio_dir, '*.mp3'))
    total_files = len(audio_files)
    
    max_workers = min(os.cpu_count(), 6)
    
    results = []
    completed = 0
    
    with ProcessPoolExecutor(max_workers=max_workers, initializer=init_worker, initargs=(model_path,)) as executor:
        futures = [executor.submit(process_features, f) for f in audio_files]
        
        for future in as_completed(futures):
            results.append(future.result())
            completed += 1
            percent = (completed / total_files) * 100
            sys.stdout.write(f"\r진행률: {percent:.1f}% ({completed}/{total_files})")
            sys.stdout.flush()
            
    print() 
            
    if results:
        names, root_notes, scales, valences, arousals = zip(*results)
        
        v_arr = np.array(valences)
        a_arr = np.array(arousals)
        
        v_min, v_max = v_arr.min(), v_arr.max()
        a_min, a_max = a_arr.min(), a_arr.max()
        
        if v_max - v_min > 0:
            v_scaled = 2 * ((v_arr - v_min) / (v_max - v_min)) - 1
        else:
            v_scaled = v_arr
            
        if a_max - a_min > 0:
            a_scaled = 2 * ((a_arr - a_min) / (a_max - a_min)) - 1
        else:
            a_scaled = a_arr
            
        conn = pymysql.connect(host=db_host, port=db_port, user=db_user, password=db_password, database=db_name)
        cursor = conn.cursor()
        
        artist_cache = {}
        cursor.execute("SELECT artist_name, artist_id FROM artists")
        for row in cursor.fetchall():
            artist_cache[row[0].upper()] = row[1]
            
        artist_insert_query = """
        INSERT INTO artists (artist_name) VALUES (%s)
        ON DUPLICATE KEY UPDATE artist_id=LAST_INSERT_ID(artist_id)
        """
        
        insert_query = """
        INSERT IGNORE INTO songs_pop(title, artist_id, root_note, scale, russell_pt)
        VALUES (%s, %s, %s, %s, POINT(%s, %s))
        """
        
        songs_data = []
        
        for i in range(len(names)):
            filename = names[i].replace('.mp3', '')
            
            if ' - ' in filename:
                parts = filename.split(' - ', 1)
                artist_name = parts[0].strip().upper()
                song_title = parts[1].strip()
                
                if artist_name not in artist_cache:
                    cursor.execute(artist_insert_query, (artist_name,))
                    artist_cache[artist_name] = cursor.lastrowid
                    
                artist_id = artist_cache[artist_name]
            else:
                song_title = filename.strip()
                artist_id = None
                
            songs_data.append((song_title, artist_id, root_notes[i], scales[i], float(v_scaled[i]), float(a_scaled[i])))
            
        cursor.executemany(insert_query, songs_data)
        
        conn.commit()
        cursor.close()
        conn.close()
        
        print("DB 등록 완료")

    if results:
        names, root_notes, scales, valences, arousals = zip(*results)
        
        plt.figure(figsize=(10, 10))
        plt.scatter(valences, arousals, color='blue', alpha=0.7)
        
        plt.axhline(0, color='black', linewidth=1)
        plt.axvline(0, color='black', linewidth=1)
        plt.xlim(-1, 1)
        plt.ylim(-1, 1)
        plt.xlabel('Valence (Negative <-> Positive)')
        plt.ylabel('Arousal (Calm <-> Excited)')
        plt.title('Audio Emotion Analysis (Russell Circumplex Model)')
        plt.grid(True, linestyle='--', alpha=0.5)
        
        plt.savefig('emotion_scatter.png')
        print("saved as emotion_scatter.png")
    else:
        print("분석할 파일 없음.")