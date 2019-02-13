import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  forwardRef
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { ISelectedChipsMap } from '@app/interface';

@Component({
  selector       : 'app-search',
  templateUrl    : './search.component.html',
  styleUrls      : ['./search.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers      : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi      : true
    }
  ]
})
export class SearchComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input()
  searchTitleResult: { title: string }[] = [];
  @Output()
  onSearch = new EventEmitter();
  @Output()
  onInputChange = new EventEmitter<Observable<string>>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchFormControl = new FormControl();
  endTime = new Date();
  startTime = new Date(this.endTime.getTime() - 31536000000);

  private _searchMap: ISelectedChipsMap = {
    category: null,
    title: null,
    start: null,
    end: null
  };

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  onChange: (_: ISelectedChipsMap) => void = () => null;
  onTouched: () => void = () => null;
  constructor(private _cdr: ChangeDetectorRef) {}

  writeValue(value: ISelectedChipsMap): void {
    this._searchMap = value;
    this._cdr.markForCheck();

    this._searchHandler();
  }
  registerOnChange(fn: (_: ISelectedChipsMap) => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  get selectedChips() {
    const selectedArr = [];
    for (const k in this._searchMap) {
      if (this._searchMap[k]) {
        selectedArr.push(this._searchMap[k]);
      }
    }
    return selectedArr;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    this._addChipsMap(value);

    if (input) {
      input.value = '';
    }

    this._resetForm();
  }

  remove(value: any): void {
    if (value._id) {
      this._searchMap.category = 0;
      // this.inChipsChange.emit(null);
      this.onChange(null);
    } else {
      this._searchMap[value.key] = 0;
    }
    this._searchHandler();
  }

  select(e: MatAutocompleteSelectedEvent): void {
    this._addChipsMap(e.option.viewValue);
    this.searchInput.nativeElement.value = '';
    this._resetForm();
  }

  chipsColorHandler(chip: { key: string }) {
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

  /**
   * 添加chip
   *
   * @private
   * @param {string} value
   * @memberof SearchComponent
   */
  private _addChipsMap(value: string) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      if (this._dateHandler(this._searchMap.start.name) <= this._dateHandler(value) && this._searchMap.start.name) {
        this._searchMap.end = { name: value, key: 'end' };
      } else {
        this._searchMap.start = { name: value, key: 'start' };
      }
    } else if (value !== '') {
      this._searchMap.title = { name: value, key: 'title' };
    }
    if (value !== '') {
      this._searchHandler();
    }
  }

  /**
   *
   *
   * @private
   * @param {string} date
   * @returns {number}
   * @memberof SearchComponent
   */
  private _dateHandler(date: string): number {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return parseInt(date.replace(/-/g, ''), 10);
    } else {
      return 0;
    }
  }

  private _searchHandler() {
    const emit = {};
    for (const k in this._searchMap) {
      if (this._searchMap[k]) {
        emit[k] = this._searchMap[k]._id || this._searchMap[k].name;
      }
    }
    this.onSearch.emit(emit);
  }

  // private _watchInChipsChange() {
  //   if (this.inChips) {
  //     this._searchMap.category = this.inChips;
  //     this._searchHandler();
  //   }
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.chips.filter(d => d.name.toLowerCase().indexOf(filterValue) === 0);
  // }

  private _resetForm() {
    this.searchFormControl.reset();
  }

  ngOnInit(): void {
    this.onInputChange.emit(this.searchFormControl.valueChanges);
  }

  ngOnChanges(): void {
    // this._watchInChipsChange();
  }
}
