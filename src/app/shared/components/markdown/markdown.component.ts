import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, ElementRef } from '@angular/core';
import * as marked from 'marked';
import * as hljs from 'highlight.js';

@Component({
  selector: '[app-markdown]',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent implements OnInit, OnChanges {
  @Input()
  text: string;
  @Input()
  code = false;

  private _marked: any;
  constructor(private _el: ElementRef) {
    this._marked = marked;
  }

  private _markdownHandler() {
    this._el.nativeElement.innerHTML = this._marked(this.text);
  }

  ngOnInit() {
    this._marked.setOptions({
      highlight: (code: string) => (this.code ? hljs.highlightAuto(code).value : code),
      breaks: true
    });
  }

  ngOnChanges() {
    this._markdownHandler();
  }
}
