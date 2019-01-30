import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { map, tap, catchError, retry } from 'rxjs/operators';

import { LoggerService } from '@app/core/services/logger.service';
import { ResponseHandlerService } from '@app/core/services/response-handler.service';
import { ICategory, IArticle, ISearchMap } from '@app/interface';

const CATEGORIES_KEY = makeStateKey<ICategory[]>('categories');
// const ARTICLES_SUBJECT_KEY = makeStateKey<Subject<IArticle[]>>('articlesSubject');

@Injectable()
export class BlogService {
  articlesSubject = new BehaviorSubject<IArticle[]>([]);
  categories: ICategory[];
  isLoading = false;

  constructor(private _http: HttpClient, private _loggerSer: LoggerService, private _state: TransferState) {
    this._getCategory();
  }

  getArticles(index = '1', limit = '5') {
    this.isLoading = true;
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
          this._loggerSer.responseLog(d, 'getArticles');
        }),
        catchError(ResponseHandlerService.handleErrorData<IArticle[]>('getArticles', []))
      )
      .subscribe(d => {
        this.articlesSubject.next(d);
        this.isLoading = false;
      });
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
        this.articlesSubject.next(d);
      });
  }

  private _getCategory() {
    const category = this._state.get(CATEGORIES_KEY, null);

    if (category) {
      this.categories = category;
    } else {
      this._http
        .get<IResponse<ICategory[]>>('/category')
        .pipe(
          retry(3),
          map(d => d.data),
          tap(d => {
            this._loggerSer.responseLog(d, '_getCategory');
          }),
          catchError(ResponseHandlerService.handleErrorData<ICategory[]>('_getCategory', []))
        )
        .subscribe(d => {
          this._state.set(CATEGORIES_KEY, d);
          this.categories = d;
        });
    }
  }
}
