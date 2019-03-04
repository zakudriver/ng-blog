import { Injectable } from '@angular/core';
import { AppService } from '@app/modules/app.service';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router, ActivatedRoute } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable()
export class LayoutService {
  date: string;
  title: string;
  backgroundUrl: string;

  private _cover: { home: string; blog: string };
  private _title: string;

  constructor(
    private _appSer: AppService,
    private _router: Router,
    private _titleSet: Title,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) {
    _activatedRoute.firstChild.firstChild.data.subscribe(d => {
      this._title = d.title;

      _appSer.profile$
        .pipe(
          switchMap(da => {
            this._cover = da.cover;
            this.backgroundUrHandler();
            return _router.events;
          }),
          filter((e: ActivationEnd) => e instanceof ActivationEnd)
        )
        .subscribe(e => {
          if (typeof e.snapshot.data.title === 'string') {
            this._title = e.snapshot.data.title;
            this.titleHandler(this._title);
            this.dateHandler('');
            this.backgroundUrHandler();
          }
        });
    });
  }

  backgroundUrHandler(url?: string) {
    if (url) {
      this.backgroundUrl = url;
    } else if (this._cover) {
      this.backgroundUrl = this._cover[(this._title || 'home').toLocaleLowerCase()];
    }
  }

  titleHandler(tlt: string) {
    this.title = tlt;
    this._titleSet.setTitle(`zyhua _ ${tlt || 'Home'}`);
  }

  dateHandler(date: string) {
    this.date = date;
  }
}
