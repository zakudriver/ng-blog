import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap, catchError, retry } from 'rxjs/operators';

import { LoggerService } from '@app/core/services/logger.service';
import { ResponseHandlerService } from '@app/core/services/response-handler.service';
import { ICategory, IArticle, ISearchMap } from '@app/interface';

@Injectable()
export class BlogService {
  categorySubject = new Subject<ICategory[]>();
  articleListSubject = new Subject<IArticle[]>();

  constructor(private _http: HttpClient, private _loggerSer: LoggerService) {
    this.getCategory();
  }

  /**
   * 获取分类
   *
   * @returns
   * @memberof BlogService
   */
  getCategory() {
    return this._http
      .get<IResponse<ICategory[]>>('/category')
      .pipe(
        retry(3),
        map(d => d.data),
        tap(d => {
          this._loggerSer.responseLog(d, 'getCategory');
        }),
        catchError(ResponseHandlerService.handleErrorData<ICategory[]>('getCategory', []))
      )
      .subscribe(d => {
        this.categorySubject.next(d);
      });
  }

  /**
   * 获取文章列表
   *
   * @param {string} [index='1']
   * @param {string} [limit='5']
   * @returns
   * @memberof BlogService
   */
  getArticleList(index = '1', limit = '5') {
    const params = {
      index,
      limit
    };
    const options = {
      params: new HttpParams({ fromObject: params })
    };
    this._http
      .get<IResponse<IArticle[]>>('/article/list', options)
      .pipe(
        retry(3),
        map(d => d.data),
        tap(d => {
          this._loggerSer.responseLog(d, 'getArticleList');
        }),
        catchError(ResponseHandlerService.handleErrorData<IArticle[]>('getArticleList', []))
      )
      .subscribe(d => {
        this.articleListSubject.next(d);
      });
    return this.articleListSubject;
  }

  searchTitle(value: string) {
    const options = {
      params: new HttpParams({ fromObject: { title: value } })
    };
    return this._http.get<IResponse<{ title: string }[]>>(`/article/search`, options).pipe(
      map(d => d.data),
      tap(d => {
        this._loggerSer.responseLog(d, 'search');
      }),
      catchError(ResponseHandlerService.handleErrorData<{ title: string }[]>('search', []))
    );
  }

  saerchResult(value: ISearchMap) {
    const options = {
      params: new HttpParams({ fromObject: <any>value })
    };
    this._http
      .get<IResponse<IArticle[]>>(`/article/search`, options)
      .pipe(
        map(d => d.data),
        tap(d => {
          this._loggerSer.responseLog(d, 'search');
        }),
        catchError(ResponseHandlerService.handleErrorData<IArticle[]>('search', []))
      )
      .subscribe(d => {
        this.articleListSubject.next(d);
      });
  }
}