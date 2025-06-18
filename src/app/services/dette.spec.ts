import { TestBed } from '@angular/core/testing';

import { Dette } from './dette';

describe('Dette', () => {
  let service: Dette;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dette);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
