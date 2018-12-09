import { Directive, Input, Output, EventEmitter, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appBlackbox]'
})
export class BlackboxDirective implements OnInit {
  @Input('appBlackbox') close: boolean;
  @Output('appBlackboxChange') closeChange = new EventEmitter();

  constructor(@Inject(PLATFORM_ID) private _platformId: object) {}

  onClose() {
    document.addEventListener('click', (e: any) => {
      if (e.target.localName !== 'span') {
        this.close = false;
        this.closeChange.emit(this.close);
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.onClose();
    }
  }
}
