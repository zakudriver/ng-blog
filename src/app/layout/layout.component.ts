import { Component, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.styl']
})
export class LayoutComponent implements OnInit {
  constructor(public layoutSer: LayoutService) {}

  ngOnInit() {}
}
