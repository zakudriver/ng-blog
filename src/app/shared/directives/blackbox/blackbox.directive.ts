import { Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appBlackbox]'
})
export class BlackboxDirective {
  @Input('appBlackbox') close;
  @Output('appBlackboxChange') closeChange = new EventEmitter();

  constructor() {
    this.onClose();
  }

  onClose() {
    document.addEventListener('click', (e: any) => {
      if (e.target.localName !== 'span') {
        this.close = false;
        this.closeChange.emit(this.close);
      }
    });
  }
}
