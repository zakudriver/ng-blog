import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl']
})
export class SearchComponent implements OnInit {
  @Input()
  chips: any[] = [];
  @Input()
  selectedChips: any[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchFormControl = new FormControl();
  filteredChips: Observable<any[]>;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor() {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.selectedChips.push({ name: value });
    }

    if (input) {
      input.value = '';
    }

    this.searchFormControl.setValue(null);
  }

  remove(value: { name: string }): void {
    const index = this.selectedChips.findIndex(i => i.name === value.name);

    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectValue = event.option.viewValue;
    const selected = this.chips.find(i => selectValue.trim() === i.name);
    this.selectedChips.push(selected);
    this.searchInput.nativeElement.value = '';
    this.searchFormControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.chips.filter(d => d.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.filteredChips = this.searchFormControl.valueChanges.pipe(
      startWith(null),
      map((d: string | null) => (d ? this._filter(d) : this.chips.slice()))
    );
  }
}
