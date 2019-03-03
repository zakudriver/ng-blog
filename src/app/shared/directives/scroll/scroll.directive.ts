import { Directive, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  @Output()
  onScrollBottom = new EventEmitter();
  @Output()
  onScrollHtmlBottom = new EventEmitter();
  @Output()
  onScrolling = new EventEmitter();

  constructor(private _el: ElementRef) {}

  @HostListener('scroll')
  onScroll() {
    const el = this._el.nativeElement;
    if (el.scrollHeight - el.scrollTop === el.clientHeight) {
      this.onScrollBottom.emit();
    }
  }

  @HostListener('touchmove')
  @HostListener('window:scroll')
  onScrollGlobal() {
    this.onScrolling.emit();
    const el = document.querySelector('html');
    // window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight
    if (window.pageYOffset + window.innerHeight === document.documentElement.scrollHeight) {
      this.onScrollHtmlBottom.emit();
    }
  }
}
