import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { LoggerService } from '@app/core/services/logger.service';
import { HandleResponseService } from '@app/core/services/handle-response.service';
import { ICategory, IArticle } from '@app/interface';

@Injectable()
export class BlogService {
  categorySubject = new Subject<ICategory[]>();

  constructor(private _http: HttpClient, private _logger: LoggerService) {
    this.getCategory();
  }

  getCategory() {
    return this._http
      .get('/category')
      .pipe(
        map((d: IResponse) => d.data),
        tap(d => {
          this._logger.responseLog(d, 'getCategory');
        }),
        catchError(HandleResponseService.handleErrorData<ICategory[]>('getCategory', []))
      )
      .subscribe(d => {
        this.categorySubject.next(d);
      });
  }

  getArticleList(index = '1', limit = '5') {
    const options = { params: new HttpParams().set('index', index).set('limit', limit) };
    return this._http.get('/article/list', options).pipe(
      map((d: IResponse) => d.data),
      tap(d => {
        this._logger.responseLog(d, 'getArticleList');
      }),
      catchError(HandleResponseService.handleErrorData<IArticle[]>('getArticleList', []))
    );
  }
}
