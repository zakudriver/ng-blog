import { Directive, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  @Output()
  onScrollBottom = new EventEmitter();

  constructor(private _el: ElementRef) {}

  @HostListener('scroll')
  onScroll() {
    const el = this._el.nativeElement;
    if (el.scrollHeight - el.scrollTop === el.clientHeight) {
      this.onScrollBottom.emit();
    }
  }
}
