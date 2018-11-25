import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl']
})
export class SearchComponent implements OnInit {
  searchFormControl = new FormControl();

  constructor() {}

  searchFormChange() {
    this.searchFormControl.valueChanges.subscribe(d => {
      console.log(d);
    });
  }

  ngOnInit() {
    this.searchFormChange();
  }
}
