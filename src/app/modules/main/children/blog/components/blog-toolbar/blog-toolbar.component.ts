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

  selectedChip: IClassification;

  searchResult: any = [];

  selectable = true;
  constructor(private _blogService: BlogService) {}

  onChip(chip: IClassification) {
    console.log(chip);
    this.selectedChip = chip;
  }

  onSearch(value: any) {
    console.log(value);
  }

  ngOnInit() {
    this._blogService.classificationSubject.subscribe(d => {
      this.classification = d;
    });
  }
}
