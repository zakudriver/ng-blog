import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@app/core/services/logger.service';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { IClassification } from '@app/interface';

@Injectable()
export class BlogService {
  classificationSubject = new Subject<IClassification[]>();

  static handleError<T>(func = 'func', result?: T) {
    return (error: any): Observable<T> => {
      LoggerService.log(`${func} failed: ${error.message}`, 'red');
      return of(result as T);
    };
  }

  constructor(private _http: HttpClient, private logger: LoggerService) {}

  getClassification() {
    return this._http
      .get('/classification')
      .pipe(
        map((d: IResponse) => [{ name: 'All', color: '#f00', _id: '' }, ...d.data]),
        tap(d => {
          this.logger.responseLog(d, 'getClassification');
        }),
        catchError(
          BlogService.handleError<IClassification[]>('getClassification', [{ name: 'All', color: '#f00', _id: '' }])
        )
      )
      .subscribe(d => {
        this.classificationSubject.next(d);
      });
  }
}
