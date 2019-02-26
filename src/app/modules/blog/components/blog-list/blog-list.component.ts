import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { IArticle } from '@app/interface';
import { UtilsService } from '@app/core/services/utils.service';
import { BlogService } from '../../services/blog.service';
import { interval, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.styl']
})
export class BlogListComponent implements OnInit, OnDestroy {
  // articles: IArticle[];
  isLoading = false;

  private _subIsLoading: Subscription;
  constructor(public blogSer: BlogService, private _utilsSer: UtilsService) {
    // blogSer.articles$.subscribe(d => {
    //   this.chipColoerHandler(d);
    // });
  }

  chipColoerHandler(d: IArticle[]) {
    const colors = this._utilsSer.colors;
    let ci = 0;
    return d.map(i => {
      i.color = colors[ci++];
      if (ci > colors.length) {
        ci = 0;
      }
      return i;
    });
  }

  ngOnInit() {
    this._subIsLoading = this.blogSer.isLoading$.subscribe(d => {
      if (d === false) {
        setTimeout(() => {
          this.isLoading = d;
        }, 500);
      } else {
        this.isLoading = d;
      }
    });
  }

  ngOnDestroy(): void {
    this._subIsLoading.unsubscribe();
  }
}
