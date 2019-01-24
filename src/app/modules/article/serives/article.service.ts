import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

import { LoggerService } from '@app/core/services/logger.service';
import { ResponseHandlerService } from '@app/core/services/response-handler.service';
import { IArticle } from '@app/interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articleSubject = new Subject<IArticle>();

  constructor(private _http: HttpClient, private _loggerSer: LoggerService) {}

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
      });
  }
}
