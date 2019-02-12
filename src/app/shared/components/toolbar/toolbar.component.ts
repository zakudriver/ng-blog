import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector       : 'app-toolbar',
  templateUrl    : './toolbar.component.html',
  styleUrls      : ['./toolbar.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  isToolbar = false;

  constructor() {}

  onToolbar() {
    this.isToolbar = !this.isToolbar;
  }

  onStopPropagation(e: Event) {
    e.stopPropagation();
  }

  ngOnInit() {}
}
