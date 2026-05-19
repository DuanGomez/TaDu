import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ElementRef, ViewChild,
  signal, inject
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { YoutubeService } from '../../services/youtube.service';
import { SONG_CONFIG } from '../../song.config';

@Component({
  selector: 'app-lyrics',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './lyrics.component.html',
  styleUrl: './lyrics.component.scss',
})
export class LyricsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('section') sectionRef!: ElementRef<HTMLElement>;

  lyrics    = SONG_CONFIG.lyrics;
  spotifyUrl = SONG_CONFIG.spotifyUrl;

  isPlaying      = signal(false);
  barHeights     = signal(Array.from({ length: 5 }, () => 10));
  displayedLyric = signal('');
  lyricVisible   = signal(false);
  isEasterEgg    = signal(false);

  private syncInterval: ReturnType<typeof setInterval> | null = null;
  private barInterval:  ReturnType<typeof setInterval> | null = null;
  private prevIndex  = -2;
  private busy       = false;
  private armed          = false;
  private sectionVisible = false;

  private youtube = inject(YoutubeService);

  ngOnInit() {
    this.syncInterval = setInterval(() => this.tick(), 150);
    this.barInterval  = setInterval(() => this.animateBars(), 200);
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        this.sectionVisible = entry.isIntersecting;
        if (entry.isIntersecting && !this.armed) {
          this.armed = true;
          this.youtube.playOnNextTouch(() => this.sectionVisible);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(this.sectionRef.nativeElement);
  }

  private tick() {
    const t = this.youtube.getCurrentTime();
    this.isPlaying.set(this.youtube.isReady() && t > 0);

    // Buscar índice actual por tiempo
    let idx = -1;
    for (let i = this.lyrics.length - 1; i >= 0; i--) {
      if (t >= this.lyrics[i].time) { idx = i; break; }
    }

    if (idx !== this.prevIndex && !this.busy) {
      this.prevIndex = idx;
      const entry   = idx >= 0 ? this.lyrics[idx] : null;
      const newText = entry?.text ?? '';
      const egg     = !!(entry as any)?.isEasterEgg;
      this.changeLyric(newText, egg);
    }
  }

  private changeLyric(newText: string, egg = false) {
    if (newText === this.displayedLyric()) return;

    if (!this.displayedLyric()) {
      this.displayedLyric.set(newText);
      this.isEasterEgg.set(egg);
      this.lyricVisible.set(!!newText);
      return;
    }

    this.busy = true;
    this.lyricVisible.set(false);
    setTimeout(() => {
      this.displayedLyric.set(newText);
      this.isEasterEgg.set(egg);
      this.lyricVisible.set(!!newText);
      setTimeout(() => { this.busy = false; }, 380);
    }, 340);
  }

  private animateBars() {
    if (!this.isPlaying()) {
      this.barHeights.set(Array.from({ length: 5 }, () => 10));
      return;
    }
    this.barHeights.set(
      Array.from({ length: 5 }, () => 10 + Math.random() * 90)
    );
  }

  ngOnDestroy() {
    if (this.syncInterval) clearInterval(this.syncInterval);
    if (this.barInterval)  clearInterval(this.barInterval);
  }
}
