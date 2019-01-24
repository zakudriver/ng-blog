import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.styl']
})
export class ShareComponent implements OnInit {
  baseUrl: string;
  title: string;

  constructor(private _location: Location) {}

  shareWindow(name: string) {
    let url;
    switch (name) {
      case 'wechat':
        url = `http://qr.topscan.com/api.php?text=${this.baseUrl}&w=300&el=h&m=10`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${this.baseUrl}`;
        break;
      case 'twitter':
        url = `http://twitter.com/share?text=${this.title}&url=${this.baseUrl}`;
        break;
      case 'evernote':
        url = `https://www.evernote.com/clip.action?url=${this.baseUrl}&title=${this.title}`;
        break;
    }
    url = encodeURI(url);
    const awidth = (screen.availWidth / 6) * 2;
    const h = (screen.availHeight / 5) * 2;
    const param0 = 'scrollbars=0,status=0,menubar=0,resizable=2,location=0';
    const params = `top=${(screen.availHeight - h) / 2},left=${(screen.availWidth - awidth) /
      2},width=${awidth},height=${h},${param0}`;

    const win = window.open(url, 'share', params);
    win.focus();
  }

  ngOnInit() {
    this.baseUrl = 'https://zyhua.cn' + this._location.path();
    this.title = document.title || 'zyhua.cn';
  }
}
