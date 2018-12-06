import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError, retry } from 'rxjs/operators';

import { LoggerService } from '@app/core/services/logger.service';
import { HandleResponseService } from '@app/core/services/handle-response.service';
import { ICategory, IArticle, ISearchMap } from '@app/interface';

@Injectable()
export class BlogService {
  categorySubject = new Subject<ICategory[]>();
  articleListSubject = new Subject<IArticle[]>();

  constructor(private _http: HttpClient, private _logger: LoggerService) {
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
      .get('/category')
      .pipe(
        retry(3),
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
      .get('/article/list', options)
      .pipe(
        retry(3),
        map((d: IResponse) => d.data),
        tap(d => {
          this._logger.responseLog(d, 'getArticleList');
        }),
        catchError(HandleResponseService.handleErrorData<IArticle[]>('getArticleList', []))
      )
      .subscribe(d => {
        this.articleListSubject.next(d);
      });
  }

  searchTitle(value: string) {
    const options = {
      params: new HttpParams({ fromObject: { title: value } })
    };
    return this._http.get(`/article/search`, options).pipe(
      map((d: IResponse) => d.data),
      tap(d => {
        this._logger.responseLog(d, 'search');
      }),
      catchError(HandleResponseService.handleErrorData<IArticle[]>('search', []))
    );
  }

  saerchResult(value: ISearchMap) {
    const options = {
      params: new HttpParams({ fromObject: <any>value })
    };
    this._http
      .get(`/article/search`, options)
      .pipe(
        map((d: IResponse) => d.data),
        tap(d => {
          this._logger.responseLog(d, 'search');
        }),
        catchError(HandleResponseService.handleErrorData<IArticle[]>('search', []))
      )
      .subscribe(d => {
        this.articleListSubject.next(d);
      });
  }
}
