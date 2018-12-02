import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class MainService {
  title = new Subject();
  constructor(private _route: ActivatedRoute, private _router: Router) {
    this.subNavigationEnd();
  }

  subNavigationEnd() {
    this._router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => this.handleTitle());
  }

  handleTitle() {
    this._route.firstChild.firstChild.firstChild.data.subscribe(d => {
      this.title.next(d.title);
    });
  }
}
