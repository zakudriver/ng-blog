import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken('app.config');

export const AppConfig = {
  api: '127.0.0.1:8999',
  headerDesktopLimit: 500,
  headerScrollLimit: 60,
  router: [
    {
      path: '',
      name: 'HOME',
      icon: 'home'
    },
    {
      path: '/blog',
      name: 'BLOG',
      icon: 'border_color'
    },
    {
      path: '/about',
      name: 'ABOUT',
      icon: 'import_contacts'
    }
  ]
};
export type appconfig = typeof AppConfig;
