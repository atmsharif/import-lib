import { TestBed } from '@angular/core/testing';

import { AuthenticationModelService } from './authentication-model.service';

describe('AuthenticationModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationModelService = TestBed.get(AuthenticationModelService);
    expect(service).toBeTruthy();
  });
});
