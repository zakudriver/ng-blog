import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl']
})
export class MainComponent implements OnInit {
  constructor() {}

  onScroll(e) {
    console.log(e);
  }

  ngOnInit() {
    // this.onScroll();
  }
}
