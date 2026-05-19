import { Injectable } from '@angular/core';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  private player:      any  = null;
  private playerReady       = false;
  private startTime         = 0;
  private apiPromise: Promise<void> | null = null;

  loadAPI(): Promise<void> {
    if (this.apiPromise) return this.apiPromise;
    this.apiPromise = new Promise(resolve => {
      if (window.YT?.Player) { resolve(); return; }
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => resolve();
    });
    return this.apiPromise;
  }

  createPlayer(elementId: string, videoId: string, start = 0, end?: number): void {
    this.startTime = start;
    this.player = new window.YT.Player(elementId, {
      height: '1',
      width: '1',
      videoId,
      playerVars: {
        autoplay:       0,   // sin autoplay — esperamos gesto del usuario
        mute:           0,
        playsinline:    1,   // no pantalla completa en iOS
        controls:       0,
        disablekb:      1,
        fs:             0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel:            0,
        origin:         window.location.origin,
        ...(start             && { start }),
        ...(end !== undefined  && { end }),
      },
      events: {
        onReady: (e: any) => {
          this.playerReady = true;
          // Posiciona en el segundo exacto sin reproducir
          e.target.seekTo(start, true);
        },
      },
    });
  }

  /**
   * Registra listeners de touchstart/click en el documento.
   * Si se pasa `isVisible`, solo reproduce cuando esa función retorne true
   * (es decir, cuando la sección de lyrics esté realmente en pantalla).
   * Los listeners se eliminan solos en cuanto el video arranca.
   */
  playOnNextTouch(isVisible?: () => boolean): void {
    const play = () => {
      if (!this.playerReady) return;
      if (isVisible && !isVisible()) return;
      document.removeEventListener('touchstart', play);
      document.removeEventListener('click',      play);
      this.player.seekTo(this.startTime, true);
      this.player.playVideo();
    };
    document.addEventListener('touchstart', play, { passive: true });
    document.addEventListener('click',      play);
  }

  getCurrentTime(): number {
    return this.playerReady ? (this.player.getCurrentTime?.() ?? 0) : 0;
  }

  isReady(): boolean {
    return this.playerReady;
  }
}
