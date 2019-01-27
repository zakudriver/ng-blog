import { Component, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';
import { IArticle } from '@app/interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit {
  constructor(public blogSer: BlogService) {}

  ngOnInit() {
    // this._blogSer.getArticleList().subscribe(d => {
    //   this.articleList = d;
    // });
    this.blogSer.getArticles();
  }
}
