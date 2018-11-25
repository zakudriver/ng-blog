import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ClassificationService } from '@app/core/services/classification/classification.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.styl']
})
export class BlogComponent implements OnInit {
  constructor(private classification: ClassificationService) {}

  ngOnInit() {
    this.classification.getClassification().subscribe();
  }
}
