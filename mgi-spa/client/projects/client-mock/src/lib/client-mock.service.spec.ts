import { TestBed } from '@angular/core/testing';

import { ClientMockService } from './client-mock.service';

describe('ClientMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientMockService = TestBed.get(ClientMockService);
    expect(service).toBeTruthy();
  });
});
