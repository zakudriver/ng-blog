import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector       : 'app-loading-placeholder',
  templateUrl    : './loading-placeholder.component.html',
  styleUrls      : ['./loading-placeholder.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingPlaceholderComponent implements OnInit {
  @Input()
  height: string;
  @Input()
  width: string;
  constructor() {}

  ngOnInit() {}
}
