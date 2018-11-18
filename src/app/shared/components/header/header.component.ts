import { Component, OnInit, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  isDesktop = true;
  isMobileMenu = false;
  isTransparent = false;

  constructor(public el: ElementRef) {
    const clientWidth = document.documentElement.clientWidth;
    this.isDesktop = clientWidth > 990;
  }

  onResize() {
    const el = fromEvent(window, 'resize');
    el.subscribe(e => {
      this.isDesktop = (e.target as Window).innerWidth > 990;
    });
  }

  onScroll() {
    const el = fromEvent(window, 'scroll');
    el.subscribe(e => {
      const navTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.isTransparent = navTop > 60;
    });
  }

  public onDrawer() {
    this.isMobileMenu = !this.isMobileMenu;
  }

  ngOnInit() {
    this.onResize();
    this.onScroll();
  }
}
