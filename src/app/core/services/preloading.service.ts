import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadingService implements PreloadingStrategy {
  preloadedModules: string[] = [];
  constructor() {}

  preload(route: Route, load: () => Observable<any>) {
    if (route.data && route.data.preload) {
      this.preloadedModules.push(route.path);
      return load();
    } else {
      return of(null);
    }
  }
}
