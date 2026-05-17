import {
  Component, OnInit, OnDestroy, HostListener,
  ElementRef, ViewChild, AfterViewInit, signal, computed
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { SONG_CONFIG } from '../../song.config';

interface Heart {
  id: number;
  x: number;
  active: boolean;
}

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('section') sectionRef!: ElementRef<HTMLElement>;

  paragraphs: string[] = [];
  msgStars = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: (i * 43 + 7) % 94,
    y: (i * 67 + 11) % 88,
    size: 1 + (i % 2),
    delay: (i * 0.45) % 4,
    dur: 2.5 + (i % 3) * 0.9,
  }));
  modalOpen    = signal(false);
  envelopeOpen = signal(false);
  snoopyVisible  = signal(false);
  snoopyFlipped  = signal(false);
  scrollProgress = signal(0);
  hearts: Heart[] = Array.from({ length: 5 }, (_, i) => ({ id: i, x: 20 + i * 15, active: false }));

  private heartInterval: ReturnType<typeof setInterval> | null = null;
  private observer!: IntersectionObserver;

  snoopyX = computed(() => Math.sin(this.scrollProgress() * Math.PI * 2) * 32);
  snoopyY = computed(() => this.scrollProgress() * -30);

  ngOnInit() {
    this.paragraphs = SONG_CONFIG.message
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.snoopyVisible.set(entry.isIntersecting);
        if (entry.isIntersecting) this.startHearts();
        else this.stopHearts();
      },
      { threshold: 0.1 }
    );
    this.observer.observe(this.sectionRef.nativeElement);
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.sectionRef) return;
    const el = this.sectionRef.nativeElement;
    const rect = el.getBoundingClientRect();
    const total = el.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / total));
    this.scrollProgress.set(progress);
    this.snoopyFlipped.set(this.snoopyX() < 0);
  }

  openLetter() {
    if (!this.envelopeOpen()) {
      this.envelopeOpen.set(true);
      setTimeout(() => this.modalOpen.set(true), 700);
    } else {
      this.modalOpen.set(true);
    }
  }

  closeModal() {
    this.modalOpen.set(false);
  }

  private startHearts() {
    this.heartInterval = setInterval(() => {
      const idx = Math.floor(Math.random() * this.hearts.length);
      this.hearts[idx].active = true;
      setTimeout(() => (this.hearts[idx].active = false), 1200);
    }, 900);
  }

  private stopHearts() {
    if (this.heartInterval) clearInterval(this.heartInterval);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.stopHearts();
  }
}
