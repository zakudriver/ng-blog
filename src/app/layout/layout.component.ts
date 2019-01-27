import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AppService } from '@app/modules/app.service';
import { Router, ActivationEnd } from '@angular/router';
import { ArticleService } from '@app/modules/article/serives/article.service';
import { Title } from '@angular/platform-browser';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.styl']
})
export class LayoutComponent implements OnInit {
  title: string;
  backgroundUrl: string;

  constructor(public layoutSer: LayoutService) {
    layoutSer.backgroundUrlSubject.subscribe(d => {
      this.backgroundUrl = d;
    });
  }

  ngOnInit() {
  }
}
