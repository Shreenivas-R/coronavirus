import { TestBed } from '@angular/core/testing';

import { CountriesSerService } from './countries-ser.service';

describe('CountriesSerService', () => {
  let service: CountriesSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
