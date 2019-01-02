import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { filter, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { ArticleService } from '@app/modules/main/children/article/serives/article.service';
import { LoggerService } from '@app/core/services/logger.service';
import { ReponseHandlerService } from '@app/core/services/reponse-handler.service';
import { IProfile } from '@app/interface';

@Injectable()
export class MainService {
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
    this.subNavigationEnd();
  }

  subNavigationEnd() {
    this._router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => this.handleTitle());
  }

  handleTitle() {
    this._route.firstChild.firstChild.firstChild.data.subscribe(d => {
      this.titleSubject.next(d.title);
    });
    this._articleService.articleSubject.subscribe(d => {
      this.titleSubject.next(d.title);
    });
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
}
