import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/modules/main/children/blog/services/blog.service';
import { ICategory } from '@app/interface';
import { MatChipListChange, MatChipSelectionChange } from '@angular/material';

@Component({
  selector: 'app-blog-toolbar',
  templateUrl: './blog-toolbar.component.html',
  styleUrls: ['./blog-toolbar.component.styl']
})
export class BlogToolbarComponent implements OnInit {
  category: ICategory[];

  selectedChip: ICategory;

  searchResult: any = [];

  selectable = true;
  constructor(private _blogService: BlogService) {}

  onChip(chip: ICategory) {
    console.log(chip);
    this.selectedChip = chip;
  }

  onSearch(value: any) {
    console.log(value);
  }

  ngOnInit() {
    this._blogService.categorySubject.subscribe(d => {
      this.category = d;
    });
  }
}
