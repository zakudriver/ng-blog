import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoggerService } from '@app/core/services/logger.service';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ICategory, IArticle } from '@app/interface';

@Injectable()
export class BlogService {
  categorySubject = new Subject<ICategory[]>();
  // articleListSubject = new Subject<IArticle[]>();

  static handleError<T>(func = 'func', result?: T) {
    return (error: any): Observable<T> => {
      LoggerService.log(`${func} failed: ${error.message}`, 'red');
      return of(result as T);
    };
  }

  constructor(private _http: HttpClient, private logger: LoggerService) {
    this.getCategory();
  }

  getCategory() {
    return this._http
      .get('/category')
      .pipe(
        map((d: IResponse) => d.data),
        tap(d => {
          this.logger.responseLog(d, 'getCategory');
        }),
        catchError(BlogService.handleError<ICategory[]>('getCategory', []))
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
        this.logger.responseLog(d, 'getArticleList');
      }),
      catchError(BlogService.handleError<IArticle[]>('getArticleList', []))
    );
  }
}
