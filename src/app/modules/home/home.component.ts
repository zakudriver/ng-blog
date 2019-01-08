import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/services/app.service';
import { IProfile } from '@app/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  profile: IProfile = this._appService.profile || {
    name: '',
    avatar: '',
    profile: '',
    description: ''
  };

  constructor(private _appService: AppService) {}

  ngOnInit() {
    this._appService.profileSubject.subscribe(d => {
      this.profile = d;
    });
  }
}
