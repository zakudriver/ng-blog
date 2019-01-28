import { Component, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit {
  constructor(public blogSer: BlogService) {}

  onScrollBottom() {
    console.log('b');
  }

  ngOnInit() {
    this.blogSer.getArticles();
  }
}
