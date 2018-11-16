import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  isDesktop = true;
  isMobileMenu = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // iconRegistry.addSvgIcon(
    //   'menu',
    //   sanitizer.bypassSecurityTrustResourceUrl('assets/img/baseline-menu-24px.svg')
    // );
  }

  private onResize() {
    const el = fromEvent(window, 'resize');
    el.subscribe(e => {
      console.log((e.target as Window).innerWidth);
      this.isDesktop = (e.target as Window).innerWidth > 990;
    });
  }

  public onDrawer() {
    this.isMobileMenu = !this.isMobileMenu;
  }

  ngOnInit() {
    this.onResize();
  }
}
