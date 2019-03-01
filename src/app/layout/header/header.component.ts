import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { animate, style, transition, trigger, state } from '@angular/animations';
import { APP_CONFIG, AppConfig, AppConfigRouter } from '@app/config/app.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
  animations: [
    trigger('scroll', [
      state(
        'top',
        style({
          'padding-top': '25px'
        })
      ),
      state(
        'scrolling',
        style({
          'padding-top': '10px'
        })
      ),
      transition('* => *', [animate(150)])
    ]),
    trigger('menu', [
      state(
        'show',
        style({
          transform: 'rotate(270deg)'
        })
      ),
      state(
        'hidden',
        style({
          transform: 'rotate(0deg)'
        })
      ),
      transition('* => *', [animate(150)])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  router: AppConfigRouter;
  isDesktop = true;
  isScrolling = false;
  scrollState = 'top';
  isVisable = 'hidden';

  constructor(
    @Inject(APP_CONFIG) private _config: AppConfig,
    @Inject(PLATFORM_ID) private _platformId: object,
    private _cdr: ChangeDetectorRef
  ) {
    this.router = _config.router;
  }

  onResize() {
    const el = fromEvent(window, 'resize');
    el.subscribe(e => {
      this.isDesktop = (e.target as Window).innerWidth > this._config.headerDesktopLimit;
      this._cdr.markForCheck();
    });
  }

  onScroll() {
    const navTop = document.documentElement.scrollTop || document.body.scrollTop;
    const isTop = navTop > this._config.headerScrollLimit;
    this.isScrolling = isTop;
    this.scrollState = isTop ? 'scrolling' : 'top';
    this._cdr.markForCheck();
  }

  onOpenMenu() {
    this.isVisable = 'show';
  }

  onCloseMenu() {
    this.isVisable = 'hidden';
  }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      const clientWidth = document.documentElement.clientWidth;
      this.isDesktop = clientWidth > this._config.headerDesktopLimit;
      this.onResize();
    }
  }
}
