import { TestBed } from '@angular/core/testing';

import { DefaultInterceptorService } from './default-interceptor.service';

describe('DefaultInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultInterceptorService = TestBed.get(DefaultInterceptorService);
    expect(service).toBeTruthy();
  });
});
