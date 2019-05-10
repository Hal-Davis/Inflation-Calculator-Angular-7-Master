import { TestBed } from '@angular/core/testing';

import { InflationService } from './inflation.service';

describe('InflationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InflationService = TestBed.get(InflationService);
    expect(service).toBeTruthy();
  });
});
