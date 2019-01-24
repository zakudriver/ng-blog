import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/modules/blog/services/blog.service';
import { ICategory, ISearchMap } from '@app/interface';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-toolbar',
  templateUrl: './blog-toolbar.component.html',
  styleUrls: ['./blog-toolbar.component.styl']
})
export class BlogToolbarComponent implements OnInit {
  category: ICategory[];

  selectedChip: ICategory;

  searchResult: any;
  searchTitleResult: { title: string }[];

  selectable = true;
  constructor(private _blogSer: BlogService) {}

  onChip(chip: ICategory) {
    this.selectedChip = chip;
  }

  onSearch(value: ISearchMap) {
    console.log(value);
    this._blogSer.saerchResult(value);
  }

  onSearchChange(inputing: Observable<string>) {
    inputing
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(i => this._blogSer.searchTitle(i))
      )
      .subscribe(d => {
        this.searchTitleResult = d;
      });
  }

  ngOnInit() {
    this._blogSer.categorySubject.subscribe(d => {
      this.category = d;
    });
  }
}
