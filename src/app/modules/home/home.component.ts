import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/modules/app.service';
import { IProfile } from '@app/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  constructor(public appService: AppService) {}

  ngOnInit() {}
}
