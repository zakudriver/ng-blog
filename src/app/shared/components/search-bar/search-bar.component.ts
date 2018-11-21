import { Component, OnInit, Input } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.styl'],
  animations: [
    trigger('search', [
      state(
        'open',
        style({
          width: '180px'
        })
      ),
      state(
        'close',
        style({
          width: '0'
        })
      ),
      transition('open => close', [animate(300)]),
      transition('close => open', [animate(150)])
    ])
  ]
})
export class SearchBarComponent implements OnInit {
  @Input() isScrolling = true;
  @Input() isDesktop;
  isSearchBtn = true;
  searchState = 'close';

  constructor() {}

  onSearch() {
    this.isSearchBtn = false;
    this.searchState = 'open';
  }

  onClose() {
    document.addEventListener('click', () => {
      this.searchState = 'close';
      this.isSearchBtn = true;
    });
  }

  ngOnInit() {
    this.onClose();
  }
}
