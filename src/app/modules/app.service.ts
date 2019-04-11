import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ResponseHandlerService } from '@app/core/services/response-handler.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { IProfile } from '@app/interface';
import { LoggerService } from '@app/core/services/logger.service';
import { HttpClientService } from '@app/core/services/http-client.service';
import { MetaService } from '@app/core/services/meta.service';

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

  constructor(
    private _http: HttpClientService,
    private _loggerSer: LoggerService,
    private _metaSer: MetaService,
    private _state: TransferState
  ) {}

  getProfile() {
    const profile = this._state.get(PROFILE_KEY, null);

    if (profile) {
      this.profile$.next(profile);
    } else {
      this._http
        .get<IProfile>('getProfile', '/config/front')
        .pipe(
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
        .subscribe(d => {
          this._state.set(PROFILE_KEY, d);
          this.profile$.next(d);
          // this._meta.updateTag({ name: 'description', content: d.description });
          this._metaSer.addTag({ name: 'description', content: d.description });

        });
    }
  }
}
