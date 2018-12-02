import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from '@app/interface';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.styl']
})
export class BlogListComponent implements OnInit {
  @Input()
  data: IArticle[];

  constructor() {}

  ngOnInit() {}
}
