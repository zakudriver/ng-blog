import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ICategory } from '@app/interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl']
})
export class SearchComponent implements OnInit, OnChanges {
  @Input()
  chips: any[] = [];
  @Input()
  inChips: ICategory;
  @Output()
  inChipsChange = new EventEmitter();

  @Output()
  search = new EventEmitter();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  date: string;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchFormControl = new FormControl();
  selectedChips: any[] = [];
  selectedChipsMap: any = {
    category: '',
    title: '',
    start: '',
    end: ''
  };

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor() {}

  get selecteds() {
    const selectedArr = [];
    for (const k in this.selectedChipsMap) {
      if (this.selectedChipsMap[k]) {
        selectedArr.push(this.selectedChipsMap[k]);
      }
    }
    return selectedArr;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // console.log(value.replace(/-/g, ''));

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      if (
        this._handleDateStr(this.selectedChipsMap.start.name) <= this._handleDateStr(value) &&
        this.selectedChipsMap.start.name
      ) {
        this.selectedChipsMap.end = { name: value, key: 'end' };
      } else {
        this.selectedChipsMap.start = { name: value, key: 'start' };
      }
    } else if (value !== '') {
      this.selectedChipsMap.title = { name: value, key: 'title' };
    }

    if (value !== '') {
      this._handleSearch();
    }

    if (input) {
      input.value = '';
    }

    this.searchFormControl.setValue(null);
  }

  remove(value: any): void {
    // switch (true) {
    //   case typeof value._id === 'string':
    //     break;
    //   case value.name === this.selectedChipsMap.start.name:
    //     this.selectedChipsMap.start = 0;
    //     break;
    //   case value.name === this.selectedChipsMap.end.name:
    //     this.selectedChipsMap.end = 0;
    //     break;
    //   case value.name === this.selectedChipsMap.title.name:
    //     this.selectedChipsMap.title = 0;
    //     break;
    // }

    if (value._id) {
      this.selectedChipsMap.category = 0;
      this.inChipsChange.emit(null);
    } else {
      this.selectedChipsMap[value.key] = 0;
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectValue = event.option.viewValue;
    const selected = this.chips.find(i => selectValue.trim() === i.name);
    this.selectedChips.push(selected);
    this.searchInput.nativeElement.value = '';
    this.searchFormControl.setValue(null);
  }

  handleChipsColor(chip: { key: string }) {
    switch (chip.key) {
      case 'title':
        return 'accent';
      case 'start':
        return 'warn';
      case 'end':
        return 'warn';
      default:
        return 'primary';
    }
  }

  private _handleDateStr(date: string): number {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return parseInt(date.replace(/-/g, ''), 10);
    } else {
      return 0;
    }
  }

  private _handleSearch() {
    const emit = {};
    for (const k in this.selectedChipsMap) {
      if (this.selectedChipsMap[k]) {
        emit[k] = this.selectedChipsMap[k]._id || this.selectedChipsMap[k].name;
      }
    }
    this.search.emit(emit);
  }

  private _handleInChipsChange(inChips: ICategory) {
    if (inChips) {
      this.selectedChipsMap.category = inChips;
      this._handleSearch();
    }
  }

  private _getDate() {
    const date = new Date();
    const m = date.getMonth();
    const d = date.getDate();
    this.date = `${date.getFullYear()}-${m < 10 ? `0${m}` : m}-${m < 10 ? `0${d}` : d}`;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.chips.filter(d => d.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this._getDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._handleInChipsChange(changes.inChips.currentValue as ICategory);
  }
}
