import { TestBed } from '@angular/core/testing';

import { DriverRouteService } from './driver-route.service';

describe('DriverRouteService', () => {
  let service: DriverRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
