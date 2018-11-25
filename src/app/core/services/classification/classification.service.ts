import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClassificationService {
  constructor(private http: HttpClient) {}

  getClassification() {
    console.log('getClassification');
    return this.http.get('/classification');
  }
}
