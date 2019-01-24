import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { ResponseHandlerService } from '@app/core/services/response-handler.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { IProfile } from '@app/interface';
import { LoggerService } from '@app/core/services/logger.service';
import { ArticleService } from '@app/modules/article/serives/article.service';

@Injectable()
export class AppService {
  profileSubject = new Subject<IProfile>();
  profile: IProfile = {
    name: '',
    avatar: '',
    profile: '',
    description: '',
    cover: []
  };

  constructor(private _articleSer: ArticleService, private _http: HttpClient, private _loggerSer: LoggerService) {}

  getProfile() {
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
              cover: []
            })
          )
        )
      )
      .subscribe(d => {
        this.profileSubject.next(d);
        this.profile = d;
      });
  }
}
