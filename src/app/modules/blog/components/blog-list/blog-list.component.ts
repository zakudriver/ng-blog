import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IArticle } from '@app/interface';
import { UtilsService } from '@app/core/services/utils.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.styl']
})
export class BlogListComponent implements OnInit {
  data: IArticle[];
  constructor(public blogSer: BlogService, private _utilsSer: UtilsService) {}

  _coloerHandler(d: IArticle[]) {
    const colors = this._utilsSer.colors;
    let ci = 0;
    this.data = d.map(i => {
      i.color = colors[ci++];
      if (ci > colors.length) {
        ci = 0;
      }
      return i;
    });
  }

  ngOnInit() {
    this.blogSer.articlesSubject.subscribe(d => {
      this._coloerHandler(d);
    });
  }
}
