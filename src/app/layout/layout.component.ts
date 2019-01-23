import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AppService } from '@app/modules/app.service';
import { Router, ActivationEnd } from '@angular/router';
import { ArticleService } from '@app/modules/article/serives/article.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.styl']
})
export class LayoutComponent implements OnInit {
  title: string;
  backgroundUrl: string;
  constructor(private _appService: AppService, private _articleService: ArticleService, private _router: Router) {
    _router.events.subscribe(e => {
      if (e instanceof ActivationEnd && typeof e.snapshot.data.title === 'string') {
        this.title = e.snapshot.data.title;
        this._backgroundUrlHandler(_appService.profile.cover[this.title.toLocaleLowerCase()]);
      }
    });
  }

  private _backgroundUrlHandler(url: string) {
    this.backgroundUrl = url;
  }

  ngOnInit() {
    this._articleService.articleSubject.subscribe(d => {
      this._backgroundUrlHandler(d.cover);
    });
  }
}
