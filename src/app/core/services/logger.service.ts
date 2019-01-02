import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  static log(msg: string, color = '#000', background = '#fff') {
    this.log(msg, color, background);
  }

  constructor() {}

  log(msg: string, color = '#000', background = '#fff') {
    console.log(`%c ${msg}`, `color:${color};background:${background}`);
  }

  responseLog(data: any, func = 'function', color = '#fff', background = '#f44336') {
    console.log(`%c function: ${func}`, `color:${color};background:${background}`);
    console.log(data);
  }

  error(msg: string, obj = {}) {
    console.error(msg, obj);
  }
}
