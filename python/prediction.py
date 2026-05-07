import os
import glob
import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import librosa
import numpy as np
import matplotlib.pyplot as plt
from concurrent.futures import ProcessPoolExecutor

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

def process_single_file(audio_path):
    y, sr = librosa.load(audio_path, sr=22050)
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
        return os.path.basename(audio_path), 0.0, 0.0
        
    final_arousal = np.percentile(arousal_preds, 80)
    
    v_preds = np.array(valence_preds)
    p10 = np.percentile(v_preds, 10)
    p90 = np.percentile(v_preds, 90)
    trimmed_v = v_preds[(v_preds >= p10) & (v_preds <= p90)]
    final_valence = np.mean(trimmed_v) if len(trimmed_v) > 0 else np.mean(v_preds)
    
    print(f"분석 완료: {os.path.basename(audio_path)}")
    return os.path.basename(audio_path), final_valence, final_arousal

if __name__ == '__main__':
    audio_dir = './test_folder'
    model_path = './best_emotion_model.pth'
    
    audio_files = glob.glob(os.path.join(audio_dir, '*.mp3'))
    
    max_workers = min(os.cpu_count(), 4)
    
    print(f"총 {len(audio_files)}개 곡 병렬 처리 시작 (워커 수: {max_workers})...")
    
    results = []
    with ProcessPoolExecutor(max_workers=max_workers, initializer=init_worker, initargs=(model_path,)) as executor:
        for res in executor.map(process_single_file, audio_files):
            results.append(res)
            
    if results:
        names, valences, arousals = zip(*results)
        
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