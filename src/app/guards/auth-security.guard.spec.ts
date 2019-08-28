import { TestBed, async, inject } from '@angular/core/testing';

import { AuthSecurityGuard } from './auth-security.guard';

describe('AuthSecurityGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthSecurityGuard]
    });
  });

  it('should ...', inject([AuthSecurityGuard], (guard: AuthSecurityGuard) => {
    expect(guard).toBeTruthy();
  }));
});
