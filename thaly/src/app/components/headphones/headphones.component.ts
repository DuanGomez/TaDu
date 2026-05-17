import {
  Component, AfterViewInit, ElementRef, ViewChild, signal, inject
} from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { SONG_CONFIG } from '../../song.config';

@Component({
  selector: 'app-headphones',
  standalone: true,
  imports: [],
  templateUrl: './headphones.component.html',
  styleUrl: './headphones.component.scss',
})
export class HeadphonesComponent implements AfterViewInit {
  @ViewChild('section') sectionRef!: ElementRef<HTMLElement>;

  headphonesOn = signal(false);
  textVisible = signal(false);
  musicStarted = false;

  private youtube = inject(YoutubeService);

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          this.headphonesOn.set(true);

          setTimeout(() => this.textVisible.set(true), 600);

          if (!this.musicStarted) {
            this.musicStarted = true;
            // Small delay so the "putting headphones on" animation plays first
            setTimeout(() => this.youtube.play(), 1400);
          }
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(this.sectionRef.nativeElement);

    // Pre-load the YouTube API as soon as this component inits
    this.youtube.loadAPI().then(() => {
      this.youtube.createPlayer('yt-player', SONG_CONFIG.youtubeVideoId);
    });
  }
}
