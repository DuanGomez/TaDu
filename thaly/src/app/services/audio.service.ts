import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  private unlocked = false;

  init(src: string): void {
    if (this.audio) return;
    this.audio = new Audio(src);
    this.audio.preload = 'auto';

    // iOS Safari requiere un gesto del usuario antes de reproducir audio.
    // Al primer toque en cualquier parte de la pantalla, hacemos play+pause
    // silenciado para "desbloquear" el contexto de audio del navegador.
    const unlock = () => {
      if (this.unlocked || !this.audio) return;
      this.unlocked = true;
      this.audio.muted = true;
      this.audio.play()
        .then(() => {
          this.audio!.pause();
          this.audio!.currentTime = 0;
          this.audio!.muted = false;
        })
        .catch(() => { if (this.audio) this.audio.muted = false; });
    };
    document.addEventListener('touchstart', unlock, { once: true, passive: true });
    document.addEventListener('click',      unlock, { once: true });
  }

  play(): void {
    if (!this.audio) return;
    this.audio.play().catch(() => {
      // Reintento tras 300ms por si el buffer aún no estaba listo
      setTimeout(() => this.audio?.play().catch(() => {}), 300);
    });
  }

  getCurrentTime(): number {
    return this.audio?.currentTime ?? 0;
  }

  isPlaying(): boolean {
    return !!(this.audio && !this.audio.paused && this.audio.currentTime > 0);
  }
}
