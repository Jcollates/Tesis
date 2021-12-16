import { TestBed } from '@angular/core/testing';

import { ServiceShowService } from './service-show.service';

describe('ServiceShowService', () => {
  let service: ServiceShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
