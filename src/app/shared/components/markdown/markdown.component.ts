import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, ElementRef, ViewEncapsulation } from '@angular/core';
import * as marked from 'marked';
// import * as prism from 'prismjs';
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

  private _marked: typeof marked;
  constructor(private _el: ElementRef<HTMLDivElement>, private _dialog: MatDialog) {
    this._marked = marked.setOptions({
      breaks: true
    });
  }

  private _markdownHandler() {
    this._el.nativeElement.innerHTML = this._marked(this.text);
    window.Prism.highlightAll();
    this._onImgZoom();
  }

  private _onImgZoom() {
    this._el.nativeElement.querySelectorAll('img').forEach(i => {
      i.addEventListener('click', e => {
        this._dialog.open(ImgDialogComponent, {
          maxWidth: '90%',
          maxHeight: '90%',
          data: { src: (<any>e.target).src, alt: (<any>e.target).alt }
        });
      });
    });
  }

  ngOnInit() {}

  ngOnChanges() {
    this._markdownHandler();
  }
}
