import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/modules/blog/services/blog.service';
import { ICategory, ISearchMap, ISelectedChipsMap } from '@app/interface';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-toolbar',
  templateUrl: './blog-toolbar.component.html',
  styleUrls: ['./blog-toolbar.component.styl']
})
export class BlogToolbarComponent implements OnInit {
  selectedChip: ICategory;
  searchTitleResult: { title: string }[];

  constructor(public blogSer: BlogService) {}

  onChip(chip: ICategory) {
    // this.selectedChip = chip;
    this.blogSer.changeSearchMap({ category: chip });
  }

  onSearch(value: ISearchMap) {
    this.blogSer.saerchResult(value);
  }

  onInputChange(inputing: Observable<string>) {
    inputing
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(i => this.blogSer.searchTitle(i))
      )
      .subscribe(d => {
        this.searchTitleResult = d;
      });
  }

  ngOnInit() {
    // this.blogSer.categorySubject.subscribe(d => {
    //   this.category = d;
    // });
  }
}
