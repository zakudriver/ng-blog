import { TestBed } from '@angular/core/testing';

import { TimingService } from './timing.service';

describe('TimingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimingService = TestBed.get(TimingService);
    expect(service).toBeTruthy();
  });
});
