import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { ResponseHandlerService } from '@app/core/services/response-handler.service';
import { HttpClient } from '@angular/common/http';
import { makeStateKey, TransferState, Meta } from '@angular/platform-browser';
import { Subject, BehaviorSubject } from 'rxjs';

import { IProfile } from '@app/interface';
import { LoggerService } from '@app/core/services/logger.service';

const PROFILE_KEY = makeStateKey<IProfile>('profile');

@Injectable()
export class AppService {
  profile$ = new BehaviorSubject<IProfile>({
    name: '',
    avatar: '',
    profile: '',
    description: '',
    cover: {
      home: '',
      blog: ''
    }
  });

  constructor(private _http: HttpClient, private _loggerSer: LoggerService, private _meta: Meta, private _state: TransferState) {}

  getProfile() {
    const profile = this._state.get(PROFILE_KEY, null);

    if (profile) {
      this.profile$.next(profile);
    } else {
      this._http
        .get<IResponse<IProfile>>('/config/front')
        .pipe(
          map(d => d.data),
          tap(
            d => {
              this._loggerSer.responseLog(d, 'getProfile');
            },
            catchError(
              ResponseHandlerService.handleErrorData<IProfile>('getProfile', {
                avatar: '',
                name: 'Zyhua',
                profile: 'coder',
                description: 'code',
                cover: {
                  home: '',
                  blog: ''
                }
              })
            )
          )
        )
        .subscribe(d => {
          this._state.set(PROFILE_KEY, d);
          this.profile$.next(d);
          this._meta.updateTag({ name: 'description', content: d.description });
        });
    }
  }
}
