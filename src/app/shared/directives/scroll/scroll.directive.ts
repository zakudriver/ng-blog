import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  constructor() {}

  @HostListener('scroll', ['$event'])
  onScroll() {
    console.log('通过HostListener监听');
  }
}
