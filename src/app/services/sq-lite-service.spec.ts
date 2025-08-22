import { TestBed } from '@angular/core/testing';

import { SqLiteService } from './sq-lite-service';

describe('SqLiteService', () => {
  let service: SqLiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqLiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
