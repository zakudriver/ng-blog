import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-placeholder',
  templateUrl: './loading-placeholder.component.html',
  styleUrls: ['./loading-placeholder.component.styl']
})
export class LoadingPlaceholderComponent implements OnInit {
  @Input() height: string;
  @Input() width: string;
  constructor() {}

  ngOnInit() {}
}
