import { BlackboxDirective } from './blackbox.directive';
import { PLATFORM_ID } from '@angular/core';

describe('BlackboxDirective', () => {
  it('should create an instance', () => {
    const directive = new BlackboxDirective(PLATFORM_ID);
    expect(directive).toBeTruthy();
  });
});
