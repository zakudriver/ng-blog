import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { map, tap, catchError } from 'rxjs/operators';

import { LoggerService } from '@app/core/services/logger.service';
import { ResponseHandlerService } from '@app/core/services/response-handler.service';
import { IArticle } from '@app/interface';
import { Subject } from 'rxjs';
import { LayoutService } from '@app/layout/layout.service';

// const ARTICLE_KEY = makeStateKey<IArticle>('article');

@Injectable()
export class ArticleService {
  articleSubject = new Subject<IArticle>();

  constructor(
    private _http: HttpClient,
    private _loggerSer: LoggerService,
    private _layoutSer: LayoutService,
    private _state: TransferState,
    @Inject(PLATFORM_ID) private _platformId: object
  ) {}

  getArticle(id: string) {
    const options = { params: new HttpParams().set('_id', id) };
    this._http
      .get<IResponse<IArticle>>('/article', options)
      .pipe(
        map(d => d.data),
        tap(d => {
          this._loggerSer.responseLog(d, 'getArticle');
        }),
        catchError(
          ResponseHandlerService.handleErrorData<IArticle>('getArticle', {
            title: 'Error',
            category: {
              name: 'error'
            },
            content: 'error!!'
          } as IArticle)
        )
      )
      .subscribe(d => {
        this.articleSubject.next(d);
        this._layoutSer.titleHandler(d.title);
        this._layoutSer.backgroundUrHandler(d.cover);
      });
  }
}
