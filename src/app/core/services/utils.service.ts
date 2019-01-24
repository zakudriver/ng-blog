import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  colors = ['neutral', 'primary', 'accent', 'warn'];

  constructor() {}
}
