import { Component, OnInit, inject } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { MessageComponent } from '../components/message/message.component';
import { HeadphonesComponent } from '../components/headphones/headphones.component';
import { LyricsComponent } from '../components/lyrics/lyrics.component';
import { YoutubeService } from '../services/youtube.service';
import { SONG_CONFIG } from '../song.config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, MessageComponent, HeadphonesComponent, LyricsComponent],
  template: `
    <app-hero />
    <app-message />
    <app-headphones />
    <app-lyrics />
    <div id="yt-player" style="position:fixed;width:1px;height:1px;top:0;left:0;opacity:0;pointer-events:none;"></div>
  `,
  styles: [`:host { display: block; }`]
})
export class HomeComponent implements OnInit {
  private youtube = inject(YoutubeService);

  ngOnInit() {
    this.youtube.loadAPI().then(() => {
      this.youtube.createPlayer(
        'yt-player',
        SONG_CONFIG.youtubeVideoId,
        SONG_CONFIG.youtubeStart,
        SONG_CONFIG.youtubeEnd
      );
    });
  }
}
