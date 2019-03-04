import { trigger, animateChild, group, transition, animate, style, query } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimation', [
  transition('home => blog', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ left: '100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('400ms ease-out', style({ left: '-100%' }))]),
      query(':enter', [animate('400ms ease-out', style({ left: '0%' }))])
    ]),
    query(':enter', animateChild())
  ]),
  transition('blog => home', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('400ms ease-out', style({ left: '100%' }))]),
      query(':enter', [animate('400ms ease-out', style({ left: '0%' }))])
    ]),
    query(':enter', animateChild())
  ]),
  transition('* => article', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ transform: 'translateY(-200px)' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms ease-out', style({ transform: 'translateY(200px)' }))]),
      query(':enter', [animate('300ms ease-out', style({ transform: 'translateY(0)' }))])
    ]),
    query(':enter', animateChild())
  ])
]);
