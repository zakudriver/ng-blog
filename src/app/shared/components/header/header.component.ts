import { Component, OnInit, Inject } from '@angular/core';
import { fromEvent } from 'rxjs';
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
    ])
  ]
})
export class HeaderComponent implements OnInit {
  router: AppConfigRouter;
  isDesktop = true;
  isMobileMenu = false;
  isScrolling = false;
  scrollState = 'top';

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    const clientWidth = document.documentElement.clientWidth;
    this.isDesktop = clientWidth > config.headerDesktopLimit;
    this.router = config.router;
  }

  onResize() {
    const el = fromEvent(window, 'resize');
    el.subscribe(e => {
      this.isDesktop = (e.target as Window).innerWidth > this.config.headerDesktopLimit;
    });
  }

  onScroll() {
    const el = fromEvent(window, 'scroll');
    el.subscribe(e => {
      const navTop = document.documentElement.scrollTop || document.body.scrollTop;
      const isTop = navTop > this.config.headerScrollLimit;
      this.isScrolling = isTop;
      this.scrollState = isTop ? 'scrolling' : 'top';
    });
  }

  onDrawer(e: Event) {
    e.stopPropagation();
    this.isMobileMenu = !this.isMobileMenu;
  }

  onStopPropagation(e: Event) {
    e.stopPropagation();
  }

  ngOnInit() {
    this.onResize();
    this.onScroll();
  }
}
