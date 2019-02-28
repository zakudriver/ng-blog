import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { map, tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private _http: HttpClient, private _loggerSer: LoggerService) {}

  get<T>(func: string, url: string, params?: { [i: string]: any }): Observable<T> {
    const opt = {
      params: new HttpParams({ fromObject: params })
    };
    return this._http.get<IResponse<T>>(url, opt).pipe(
      filter(d => d.code === 0),
      map(d => d.data),
      tap(d => {
        this._loggerSer.responseLog(d, func);
      })
    );
  }

  post<T>(func: string, url: string, params?: any): Observable<IResponse<T>> {
    return this._http.post<IResponse<T>>(url, params).pipe(
      tap(d => {
        this._loggerSer.responseLog(d, func);
      })
    );
  }
}
