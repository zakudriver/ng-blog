import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title: string;
  constructor(private _appService: AppService) {}

  ngOnInit() {
    this._appService.titleSubject.subscribe((d: string) => {
      this.title = d;
    });
    this._appService.getProfile();
  }
}
