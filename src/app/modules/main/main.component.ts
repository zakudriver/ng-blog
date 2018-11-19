import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '@app/shared/components/header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl']
})
export class MainComponent implements OnInit {
  constructor() {}

  onClickBody(component: HeaderComponent) {
    component.onCloseDrawer();
  }

  ngOnInit() {}
}
