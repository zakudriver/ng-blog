import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IArticle } from '@app/interface';
import { UtilsService } from '@app/core/services/utils.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.styl']
})
export class BlogListComponent implements OnInit, OnChanges {
  @Input()
  data: IArticle[];

  constructor(private _utilsSer: UtilsService) {}

  _coloerHandler() {
    const colors = this._utilsSer.colors;
    let ci = 0;
    this.data = this.data.map(i => {
      i.color = colors[ci++];
      if (ci > colors.length) {
        ci = 0;
      }
      return i;
    });
  }

  ngOnInit() {}

  ngOnChanges() {
    this._coloerHandler();
  }
}
