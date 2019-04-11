import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private _curTag: HTMLMetaElement[] = [];

  constructor(private _meta: Meta) {}

  addTag(tag: MetaDefinition) {
    this._curTag.push(this._meta.addTag(tag));
  }

  updateTag(tag: MetaDefinition) {
    this._meta.updateTag(tag);
  }

  rmTagEle() {
    if (this._curTag.length) {
      this._curTag.forEach(i => {
        this._meta.removeTagElement(i);
      });
      this._curTag.length = 0;
    }
  }
}
