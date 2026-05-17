import { Injectable } from '@angular/core';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  private player: any = null;
  private playerReady = false;
  private apiPromise: Promise<void> | null = null;

  loadAPI(): Promise<void> {
    if (this.apiPromise) return this.apiPromise;
    this.apiPromise = new Promise(resolve => {
      if (window.YT?.Player) {
        resolve();
        return;
      }
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => resolve();
    });
    return this.apiPromise;
  }

  createPlayer(elementId: string, videoId: string, onReady?: () => void): void {
    this.player = new window.YT.Player(elementId, {
      height: '1',
      width: '1',
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          this.playerReady = true;
          onReady?.();
        },
      },
    });
  }

  play(): void {
    if (this.playerReady) this.player.playVideo();
  }

  pause(): void {
    if (this.playerReady) this.player.pauseVideo();
  }

  getCurrentTime(): number {
    return this.playerReady ? (this.player.getCurrentTime?.() ?? 0) : 0;
  }

  isReady(): boolean {
    return this.playerReady;
  }
}
