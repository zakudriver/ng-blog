import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private _http: HttpClient) {}

  getArticle() {
    // this._http.get('/article',)
  }
}
