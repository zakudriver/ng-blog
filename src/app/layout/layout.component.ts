import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AppService } from '@app/modules/app.service';
import { Router, ActivationEnd } from '@angular/router';
import { ArticleService } from '@app/modules/article/serives/article.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.styl']
})
export class LayoutComponent implements OnInit {
  title: string;
  backgroundUrl: string;
  constructor(private _appSer: AppService, private _articleSer: ArticleService, private _router: Router, private _title: Title) {
    _router.events.subscribe(e => {
      if (e instanceof ActivationEnd && typeof e.snapshot.data.title === 'string') {
        this._titleHandler(e.snapshot.data.title);
        this._backgroundUrlHandler(_appSer.profile.cover[this.title.toLocaleLowerCase()]);
      }
    });
  }

  private _backgroundUrlHandler(url: string) {
    this.backgroundUrl = url || 'assets/img/bg2.jpg';
  }

  private _titleHandler(tlt: string) {
    this.title = tlt;
    this._title.setTitle(`zyhua _ ${tlt || 'Home'}`);
  }

  ngOnInit() {
    this._articleSer.articleSubject.subscribe(d => {
      this._backgroundUrlHandler(d.cover);
      this._titleHandler(d.title);
    });
  }
}
