import { TestBed } from '@angular/core/testing';

import { HandleResponseService } from './handle-response.service';

describe('HandleResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandleResponseService = TestBed.get(HandleResponseService);
    expect(service).toBeTruthy();
  });
});
