import librosa
import numpy as np
import matplotlib.pyplot as plt
import os
import glob
from concurrent.futures import ProcessPoolExecutor

def save_mel_spectrogram(y_segment, sr, save_path):
    if len(y_segment) < 11025:
        return
        
    S = librosa.feature.melspectrogram(y=y_segment, sr=sr, n_mels=128, fmax=8000)
    S_dB = librosa.power_to_db(S, ref=np.max)
    
    plt.imsave(save_path, S_dB, cmap='viridis', origin='lower')

def process_all_segments(audio_path, song_id, save_dir):
    os.makedirs(save_dir, exist_ok=True)
    
    y, sr = librosa.load(audio_path, sr=22050)
    
    step = 500
    total_ms = int(len(y) / sr * 1000)
    
    for file_time in range(0, total_ms, step):
        start_sample = int(file_time * sr / 1000)
        end_sample = int((file_time + step) * sr / 1000)
        
        y_segment = y[start_sample:end_sample]
        
        label_time = file_time + 15000
        file_name = f"{song_id}_{label_time}.png"
        save_path = os.path.join(save_dir, file_name)
        
        save_mel_spectrogram(y_segment, sr, save_path)


#******************************************

raw_audio_dir = './MEMD_audio' 
save_dir = './spectrograms'

#******************************************


def process_single_file(audio_path):
    file_name = os.path.basename(audio_path)
    song_id = os.path.splitext(file_name)[0]
    
    print(f"Converting: {song_id}...")
    process_all_segments(audio_path, song_id, save_dir)
    return song_id


if __name__ == '__main__':
    audio_files = glob.glob(os.path.join(raw_audio_dir, '*.mp3'))
    
    max_cores = os.cpu_count()
    
    with ProcessPoolExecutor(max_workers=max_cores) as executor:
        results = executor.map(process_single_file, audio_files)
        
    for res in results:
        pass
        
    print("Converting Finished!!!!!")