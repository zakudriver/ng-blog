import { Injectable } from '@angular/core';
import { AppService } from '@app/modules/app.service';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { BlogService } from '@app/modules/blog/services/blog.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  titleSubject = new BehaviorSubject<string>('');
  backgroundUrlSubject = new BehaviorSubject<string>('');

  private _cover: { home: string; blog: string };
  private _title: string;

  private _index = 1;
  private _size = 5;

  constructor(
    private _appSer: AppService,
    private _router: Router,
    private _titleSet: Title,
    private _activatedRoute: ActivatedRoute,
    private _blogSer: BlogService,
    private _location: Location
  ) {
    _activatedRoute.firstChild.firstChild.data.subscribe(d => {
      this._title = d.title;

      _appSer.profileSubject
        .pipe(
          switchMap(d => {
            this._cover = d.cover;
            this.backgroundUrHandler();
            return _router.events;
          }),
          filter((e: ActivationEnd) => e instanceof ActivationEnd)
        )
        .subscribe(e => {
          if (typeof e.snapshot.data.title === 'string') {
            this._title = e.snapshot.data.title;
            this.titleHandler(this._title);
            this.backgroundUrHandler();
          }
        });
    });
  }

  backgroundUrHandler(url?: string) {
    if (url) {
      this.backgroundUrlSubject.next(url);
    } else if (this._cover) {
      this.backgroundUrlSubject.next(this._cover[(this._title || 'home').toLocaleLowerCase()]);
    }
  }

  titleHandler(tlt: string) {
    this.titleSubject.next(tlt);
    this._titleSet.setTitle(`zyhua _ ${tlt || 'Home'}`);
  }

  scrollBottom() {
    if (this._location.path() === '/blog' && !this._blogSer.isLoading) {
      this._index += 1;
      // console.log(this._index * this._size);
      const sum = this._index * this._size;
      this._blogSer.getArticles('1', sum.toString());
    }
  }
}
