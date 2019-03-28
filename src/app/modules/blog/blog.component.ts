import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from './services/blog.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit, OnDestroy {
  private _getArticles$ = new Subject();
  private _unSub: Subscription;
  constructor(public blogSer: BlogService) {}

  scrollBottom() {
    this._getArticles$.next();
  }

  ngOnInit() {
    this.blogSer.getArticleList();
    this._unSub = this._getArticles$.pipe(debounceTime(800)).subscribe(() => {
      this.blogSer.getArticleList();
    });
  }

  ngOnDestroy(): void {
    this.blogSer.restore();
    this._unSub.unsubscribe();
  }
}
