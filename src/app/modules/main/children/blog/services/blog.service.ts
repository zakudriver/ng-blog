import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@app/core/services/logger.service';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { IClassification, IResponse } from '@app/interface';

@Injectable()
export class BlogService {
  constructor(private http: HttpClient, private logger: LoggerService) {}

  private static handleError<T>(func = 'func', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.logger.log(`${func} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getClassification(): Observable<IClassification[]> {
    return this.http.get('/classification').pipe(
      map((d: IResponse) => {
        return d.data;
      }),
      tap(() => this.logger.log(`fetched heroes`)),
      catchError(BlogService.handleError<IClassification[]>('getClassification', []))
    );
  }
}
