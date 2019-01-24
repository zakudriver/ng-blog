import { TestBed } from '@angular/core/testing';

import { ResponseHandlerService } from './response-handler.service';

describe('ResponseHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponseHandlerService = TestBed.get(ResponseHandlerService);
    expect(service).toBeTruthy();
  });
});
