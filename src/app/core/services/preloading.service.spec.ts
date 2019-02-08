import { TestBed } from '@angular/core/testing';

import { PreloadingService } from './preloading.service';

describe('PreloadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreloadingService = TestBed.get(PreloadingService);
    expect(service).toBeTruthy();
  });
});
