import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.styl']
})
export class NotFoundComponent implements OnInit {
  constructor(private _title: Title) {}

  ngOnInit() {
    this._title.setTitle('zyhua _ 404 ')
  }
}
