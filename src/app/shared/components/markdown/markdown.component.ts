import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, ElementRef, ViewEncapsulation } from '@angular/core';
import * as marked from 'marked';
import * as prism from 'prismjs';

@Component({
  selector: '[app-markdown]',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.styl'],
  encapsulation: ViewEncapsulation.None,
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
      highlight: (code: string) => (this.code ? prism.highlight(code, prism.languages.clike) : code),
      breaks: true
    });
  }

  ngOnChanges() {
    this._markdownHandler();
  }
}
