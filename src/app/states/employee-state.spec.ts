import { TestBed } from '@angular/core/testing';

import { EmployeeState } from './employee-state';

describe('EmployeeState', () => {
  let service: EmployeeState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
