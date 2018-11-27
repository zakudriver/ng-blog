import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@app/core/services/logger.service';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { IClassification, IResponse } from '@app/interface';

@Injectable()
export class BlogService {
  static handleError<T>(func = 'func', result?: T) {
    return (error: any): Observable<T> => {
      LoggerService.log(`${func} failed: ${error.message}`, 'red');

      return of(result as T);
    };
  }

  classification = new BehaviorSubject<IClassification[]>([]);

  constructor(private http: HttpClient, private logger: LoggerService) {}

  getClassification() {
    return this.http
      .get('/classification')
      .pipe(
        map((d: IResponse) => d.data),
        tap(d => {
          this.logger.responseLog(d, 'getClassification');
        }),
        catchError(BlogService.handleError<IClassification[]>('getClassification', []))
      )
      .subscribe(d => {
        this.classification.next(d);
      });
  }
}
