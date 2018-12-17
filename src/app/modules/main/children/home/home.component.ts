import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { IProfile } from '@app/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  profile: IProfile = this._mainService.profile || {
    name: '',
    avatar: '',
    profile: '',
    description: ''
  };

  constructor(private _mainService: MainService) {}

  ngOnInit() {
    this._mainService.profileSubject.subscribe(d => {
      this.profile = d;
    });
  }
}
