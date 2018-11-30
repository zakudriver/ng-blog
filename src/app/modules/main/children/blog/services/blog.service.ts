import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@app/core/services/logger.service';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ICategory } from '@app/interface';

@Injectable()
export class BlogService {
  categorySubject = new Subject<ICategory[]>();

  static handleError<T>(func = 'func', result?: T) {
    return (error: any): Observable<T> => {
      LoggerService.log(`${func} failed: ${error.message}`, 'red');
      return of(result as T);
    };
  }

  constructor(private _http: HttpClient, private logger: LoggerService) {}

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
}
