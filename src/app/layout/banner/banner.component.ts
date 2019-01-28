import { Component, OnInit, Input, Inject, PLATFORM_ID, OnChanges } from '@angular/core';
import { fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.styl']
})
export class BannerComponent implements OnInit {
  scrollPixel = 'translate3d(0, 0, 0)';

  @Input()
  title: string;
  @Input()
  backgroundUrl: string = 'assets/img/bg2.jpg';

  constructor(@Inject(PLATFORM_ID) private _platformId: object) {}

  onScroll() {
    const el = fromEvent(window, 'scroll');
    el.subscribe(e => {
      this.scrollPixel = `translate3d(0, ${(document.documentElement.scrollTop || document.body.scrollTop) / 2}px, 0)`;
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.onScroll();
    }
  }

  // ngOnChanges() {
  //   if (!this.backgroundUrl) {
  //     this.backgroundUrl = 'assets/img/bg2.jpg';
  //   }
  // }
}
