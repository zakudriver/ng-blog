import { TestBed } from '@angular/core/testing';

import { ReponseHandlerService } from './reponse-handler.service';

describe('ReponseHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReponseHandlerService = TestBed.get(ReponseHandlerService);
    expect(service).toBeTruthy();
  });
});
