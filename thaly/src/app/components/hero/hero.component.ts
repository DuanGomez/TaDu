import { Component, OnInit, signal, inject } from '@angular/core';
import { NgStyle } from '@angular/common';
import { SONG_CONFIG } from '../../song.config';
import { AudioService } from '../../services/audio.service';

interface Star {
  id: number; x: number; y: number;
  size: number; delay: number; dur: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  recipientName = SONG_CONFIG.recipientName;
  visible = signal(false);

  private audio = inject(AudioService);

  stars: Star[] = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: (i * 37 + 5) % 93,
    y: (i * 53 + 3) % 58,
    size: 1 + (i % 3),
    delay: (i * 0.38) % 4,
    dur: 2 + (i % 3) * 0.7,
  }));

  ngOnInit() {
    setTimeout(() => this.visible.set(true), 80);
    this.audio.init('sounds/ssstik.io_1779213128784.mp3');
  }

  scrollDown() { window.scrollBy({ top: window.innerHeight, behavior: 'smooth' }); }
}
