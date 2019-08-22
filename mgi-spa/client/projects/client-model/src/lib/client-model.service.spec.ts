import { TestBed } from '@angular/core/testing';

import { ClientModelService } from './client-model.service';

describe('ClientModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientModelService = TestBed.get(ClientModelService);
    expect(service).toBeTruthy();
  });
});
