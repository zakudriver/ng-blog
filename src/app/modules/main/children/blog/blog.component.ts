import { Component, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';
import { IClassification } from '@app/interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit {
  classification: IClassification;
  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getClassification();
  }
}
