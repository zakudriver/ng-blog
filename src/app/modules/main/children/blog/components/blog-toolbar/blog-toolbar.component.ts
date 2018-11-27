import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/modules/main/children/blog/services/blog.service';
import { IClassification } from '@app/interface';
import { MatChipListChange, MatChipSelectionChange } from '@angular/material';

@Component({
  selector: 'app-blog-toolbar',
  templateUrl: './blog-toolbar.component.html',
  styleUrls: ['./blog-toolbar.component.styl']
})
export class BlogToolbarComponent implements OnInit {
  classification: IClassification[];

  selectable = true;
  constructor(private blogService: BlogService) {}

  selectionChip(chip: MatChipSelectionChange) {
    console.log(chip);
  }

  ngOnInit() {
    this.blogService.classification.subscribe(d => {
      this.classification = [{ name: 'All', color: '#f00', _id: '' }].concat(d);
    });
  }
}
