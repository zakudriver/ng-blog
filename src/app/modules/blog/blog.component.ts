import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from './services/blog.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit, OnDestroy {
  private _index = 1;
  private _size = 5;
  private _subGetArticles = new Subject();

  constructor(public blogSer: BlogService) {
    this._subGetArticles.pipe(debounceTime(800)).subscribe(() => {
      if (this._index === 1) {
        this.blogSer.getArticles(1, this._size);
      } else {
        const sum = this._index * this._size;
        this.blogSer.getArticles(1, sum);
      }
      this._index++;
    });
  }

  scrollBottom() {
    if (!this.blogSer.isMoreLoading) {
      this._subGetArticles.next();
    }
  }

  ngOnInit() {
    this._subGetArticles.next();
  }

  ngOnDestroy(): void {
    this.blogSer.articlesSubject.next([]);
  }
}
