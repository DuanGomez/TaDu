import { Component, AfterViewInit, ElementRef, ViewChild, signal } from '@angular/core';

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

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.headphonesOn.set(true);
          setTimeout(() => this.textVisible.set(true), 600);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(this.sectionRef.nativeElement);
  }
}
