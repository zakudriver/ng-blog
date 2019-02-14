import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  forwardRef,
  OnDestroy
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, Subject, Subscription } from 'rxjs';
import { ISelectedChipsMap } from '@app/interface';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true
    }
  ]
})
export class SearchComponent implements OnInit, OnDestroy, ControlValueAccessor {
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
    category: '',
    title: '',
    start: '',
    end: ''
  };
  private _searchHandler$ = new Subject();
  private _subSearchHandler: Subscription;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  onChange: (_: ISelectedChipsMap) => void = () => null;
  onTouched: () => void = () => null;
  constructor(private _cdr: ChangeDetectorRef) {}

  writeValue(value: ISelectedChipsMap): void {
    this._searchMap = value;
    this._cdr.markForCheck();
    if (this._searchMap) {
      this._searchHandler$.next();
    }
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
      this._searchMap.category = null;
    } else {
      this._searchMap[value.key] = '';
    }
    this._searchHandler$.next();
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

  private _addChipsMap(value: string) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      if (this._searchMap.start && this._dateHandler(this._searchMap.start.name) <= this._dateHandler(value)) {
        this._searchMap.end = { name: value, key: 'end' };
      } else {
        this._searchMap.start = { name: value, key: 'start' };
      }
    } else if (value !== '') {
      this._searchMap.title = { name: value, key: 'title' };
    }
    if (value !== '') {
      this._searchHandler$.next();
    }
  }

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

  private _resetForm() {
    this.searchFormControl.reset();
  }

  ngOnInit(): void {
    this.onInputChange.emit(this.searchFormControl.valueChanges);

    this._subSearchHandler = this._searchHandler$.pipe(skip(1)).subscribe(() => {
      this._searchHandler();
    });
  }

  ngOnDestroy() {
    this._subSearchHandler.unsubscribe();
  }
}
