import { TestBed } from '@angular/core/testing';

import { DeltaSync } from './delta-sync';

describe('DeltaSync', () => {
  let service: DeltaSync;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeltaSync);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
