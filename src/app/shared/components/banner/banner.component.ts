import { Component, OnInit, Input } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.styl']
})
export class BannerComponent implements OnInit {
  scrollPixel = 'translate3d(0, 0, 0)';

  @Input()
  title: string;

  constructor() {}

  onScroll() {
    const el = fromEvent(window, 'scroll');
    el.subscribe(e => {
      this.scrollPixel = `translate3d(0, ${(document.documentElement.scrollTop || document.body.scrollTop) / 2}px, 0)`;
    });
  }

  ngOnInit() {
    this.onScroll();
  }
}
