import { TestBed } from '@angular/core/testing';

import { AuthenticationMockService } from './authentication-mock.service';

describe('AuthenticationMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationMockService = TestBed.get(AuthenticationMockService);
    expect(service).toBeTruthy();
  });
});
