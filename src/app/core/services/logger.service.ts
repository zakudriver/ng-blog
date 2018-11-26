import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  static l() {}

  constructor() {}

  log(msg: string, color = '#000', background = '#fff'): void {
    console.log(`%c ${msg}`, `color:${color};background:${background}`);
  }

  error(msg: string, obj = {}): void {
    console.error(msg, obj);
  }
}
