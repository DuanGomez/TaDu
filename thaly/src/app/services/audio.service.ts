import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private audio: HTMLAudioElement | null = null;

  init(src: string): void {
    if (this.audio) return;
    this.audio = new Audio(src);
    this.audio.preload = 'auto';
  }

  play(): void {
    this.audio?.play().catch(() => {});
  }

  getCurrentTime(): number {
    return this.audio?.currentTime ?? 0;
  }

  isPlaying(): boolean {
    return !!(this.audio && !this.audio.paused && this.audio.currentTime > 0);
  }
}
