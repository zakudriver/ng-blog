import { Component, OnInit, Input, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {
  scrollPixel = 'translate3d(0, 0, 0)';

  @Input()
  title: string;
  @Input()
  backgroundUrl = 'assets/img/bg2.jpg';
  @Input()
  date: string;

  constructor(@Inject(PLATFORM_ID) private _platformId: object, private _cdr: ChangeDetectorRef) {}

  onScroll() {
    const el = fromEvent(window, 'scroll');
    el.subscribe(e => {
      this.scrollPixel = `translate3d(0, ${(document.documentElement.scrollTop || document.body.scrollTop) / 2}px, 0)`;
      this._cdr.markForCheck();
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
