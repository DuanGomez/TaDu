import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { MessageComponent } from './components/message/message.component';
import { HeadphonesComponent } from './components/headphones/headphones.component';
import { LyricsComponent } from './components/lyrics/lyrics.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, MessageComponent, HeadphonesComponent, LyricsComponent],
  template: `
    <app-hero />
    <app-message />
    <app-headphones />
    <app-lyrics />
  `,
  styles: [`:host { display: block; }`]
})
export class App {}
