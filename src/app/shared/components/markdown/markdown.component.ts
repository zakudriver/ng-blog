import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, ElementRef, ViewEncapsulation } from '@angular/core';
import * as marked from 'marked';
import * as prism from 'prismjs';
import { MatDialog } from '@angular/material';
import { ImgDialogComponent } from './components/img-dialog/img-dialog.component';

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
  constructor(private _el: ElementRef<HTMLDivElement>, private _dialog: MatDialog) {
    this._marked = marked;
  }

  private _markdownHandler() {
    this._el.nativeElement.innerHTML = this._marked(this.text);
    console.log(this._el.nativeElement.querySelectorAll('img'));
    this._onImgZoom();
  }

  private _onImgZoom() {
    this._el.nativeElement.querySelectorAll('img').forEach(i => {
      i.addEventListener('click', e => {
        this._dialog.open(ImgDialogComponent, {
          width: '90%',
          height: '90%',
          data: { src: (<any>e.target).src, alt: (<any>e.target).alt }
        });
      });
    });
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
