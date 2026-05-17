import {
  Component, AfterViewInit, ElementRef, ViewChild, signal, inject
} from '@angular/core';
import { AudioService } from '../../services/audio.service';

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
  textVisible  = signal(false);
  musicStarted = false;

  private audio = inject(AudioService);

  ngAfterViewInit() {
    this.audio.init('sounds/Una tarde juntos - Darviin.mp3');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          this.headphonesOn.set(true);
          setTimeout(() => this.textVisible.set(true), 600);
          if (!this.musicStarted) {
            this.musicStarted = true;
            setTimeout(() => this.audio.play(), 1400);
          }
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(this.sectionRef.nativeElement);
  }
}
