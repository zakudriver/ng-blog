import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { map, tap, catchError, retry, skip } from 'rxjs/operators';

import { LoggerService } from '@app/core/services/logger.service';
import { ResponseHandlerService } from '@app/core/services/response-handler.service';
import { ICategory, IArticle, ISearchMap, ISelectedChipsMap } from '@app/interface';

const CATEGORIES_KEY = makeStateKey<ICategory[]>('categories');
// const ARTICLES_SUBJECT_KEY = makeStateKey<Subject<IArticle[]>>('articles$');

@Injectable()
export class BlogService {
  categories: ICategory[];
  articles$ = new BehaviorSubject<IArticle[]>([]);

  isLoading$ = new BehaviorSubject<boolean>(false);
  isMore$ = new BehaviorSubject<boolean>(false);
  isSearch = false;

  searchMap: ISelectedChipsMap | object = {};

  index = 1;
  private _size = 5;
  private _isLoading = true;
  constructor(private _http: HttpClient, private _loggerSer: LoggerService, private _state: TransferState) {
    this._getCategory();
  }

  private _getArticles() {
    if (this.isSearch) {
      return;
    }

    if (this._isLoading) {
      this.isLoading$.next(true);
    }

    const params = {
      index: '1',
      limit: (this.index * this._size).toString()
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
          this._loggerSer.responseLog(d, '_getArticles');
        }),
        catchError(ResponseHandlerService.handleErrorData<IArticle[]>('_getArticles', []))
      )
      .subscribe(d => {
        this.articles$.next(d);

        this._checkIsMore(d);
        this.isLoading$.next(false);
        this._isLoading = false;
      });
  }

  private _checkIsMore(v: IArticle[]) {
    this.isMore$.next(v.length === this.articles$.value.length);
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

  private _saerchResult(value: ISearchMap) {
    if (!this.isSearch) {
      return;
    }
    this.isLoading$.next(true);
    const options = {
      params: new HttpParams({ fromObject: <any>value })
    };
    this._http
      .get<IResponse<IArticle[]>>(`/article/search`, options)
      .pipe(
        map(d => d.data),
        tap(d => {
          this._loggerSer.responseLog(d, '_saerchResult');
        }),
        catchError(ResponseHandlerService.handleErrorData<IArticle[]>('_saerchResult', []))
      )
      .subscribe(d => {
        this.articles$.next(d);

        this.isSearch = true;
        this._checkIsMore(d);
        this.isLoading$.next(false);
      });
  }

  changeSearchMap(v: { [i: string]: any }) {
    this.searchMap = { ...this.searchMap, ...v };
  }

  getArticle(v: ISearchMap) {
    const vs = Object.values(this.searchMap);
    vs.forEach(i => {
      if (i) {
        this.isSearch = true;
        return;
      }
      this.isSearch = false;
    });
    if (this.isSearch) {
      this._saerchResult(v);
    } else {
      this._getArticles();
    }
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
