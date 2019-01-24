import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoggerService } from './logger.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {
  static handleErrorData<T>(func = 'func', result?: T) {
    return (error: any): Observable<T> => {
      LoggerService.log(`${func} failed: ${error.message}`, 'red');
      return of(result as T);
    };
  }

  constructor(private _matSnackBar: MatSnackBar) {}

  handleReaction(response: IResponse<any>) {
    if (response.code === 0) {
      this._matSnackBar.open(response.msg);
    } else {
      this._matSnackBar.open(response.msg);
    }
  }
}
