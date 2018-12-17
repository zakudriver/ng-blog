import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { LoggerService } from '@app/core/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class HandleResponseService {
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
