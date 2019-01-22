import { Injectable } from '@angular/core';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { ReponseHandlerService } from '@app/core/services/reponse-handler.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { IProfile } from '@app/interface';
import { LoggerService } from '@app/core/services/logger.service';
import { ArticleService } from '@app/modules/article/serives/article.service';

@Injectable()
export class AppService {
  titleSubject = new Subject();
  profileSubject = new Subject<IProfile>();
  profile: IProfile;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService,
    private _http: HttpClient,
    private _logger: LoggerService
  ) {
    this._subNavigationEnd();
  }

  getProfile() {
    this._http
      .get<IResponse<IProfile>>('/config/front')
      .pipe(
        map(d => d.data),
        tap(
          d => {
            this._logger.responseLog(d, 'getArticle');
          },
          catchError(
            ReponseHandlerService.handleErrorData<IProfile>('getArticle', {
              avatar: '',
              name: 'Zyhua',
              profile: 'coder',
              description: 'code'
            })
          )
        )
      )
      .subscribe(d => {
        this.profileSubject.next(d);
        this.profile = d;
      });
  }

  private _subNavigationEnd() {
    this._router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => this._titleHandler());
  }

  private _titleHandler() {
    const t = this._route.firstChild;
    (t.data || t.firstChild.data).subscribe(d => {
      this.titleSubject.next(d.title);
    });
    this._articleService.articleSubject.subscribe(d => {
      this.titleSubject.next(d.title);
    });
  }
}
