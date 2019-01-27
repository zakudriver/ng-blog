import { Injectable } from '@angular/core';
import { AppService } from '@app/modules/app.service';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  titleSubject = new Subject<string>();
  backgroundUrlSubject = new Subject<string>();
  private _defBgUrl = 'assets/img/bg2.jpg';

  constructor(private _appSer: AppService, private _router: Router, private _title: Title) {
    _router.events.subscribe(e => {
      if (e instanceof ActivationEnd && typeof e.snapshot.data.title === 'string') {
        const title = e.snapshot.data.title;
        this.titleHandler(title);
        this.backgroundUrHandler(_appSer.profile.cover[title.toLocaleLowerCase()]);
      }
    });
  }

  backgroundUrHandler(url: string) {
    this.backgroundUrlSubject.next(url || this._defBgUrl);
  }

  titleHandler(tlt: string) {
    this.titleSubject.next(tlt);
    this._title.setTitle(`zyhua _ ${tlt || 'Home'}`);
  }
}
