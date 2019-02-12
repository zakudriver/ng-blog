import { Component, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '@app/core/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.styl'],
  animations: [slideInAnimation]
})
export class LayoutComponent implements OnInit {
  constructor(public layoutSer: LayoutService) {}

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit() {}
}
