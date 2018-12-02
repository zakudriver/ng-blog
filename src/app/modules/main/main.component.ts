import { Component, OnInit, Inject } from '@angular/core';

import { MainService } from './services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl']
})
export class MainComponent implements OnInit {
  title: string;
  constructor(private _mainService: MainService) {}

  ngOnInit() {
    this._mainService.title.subscribe((d: string) => {
      this.title = d;
    });
  }
}
