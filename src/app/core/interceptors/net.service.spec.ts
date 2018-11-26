import { TestBed } from '@angular/core/testing';

import { NetService } from './net.service';

describe('NetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetService = TestBed.get(NetService);
    expect(service).toBeTruthy();
  });
});
