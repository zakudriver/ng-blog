import { TestBed } from '@angular/core/testing';

import { ClassificationService } from './classification.service';

describe('ClassificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassificationService = TestBed.get(ClassificationService);
    expect(service).toBeTruthy();
  });
});
