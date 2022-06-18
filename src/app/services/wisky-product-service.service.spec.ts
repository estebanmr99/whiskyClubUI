import { TestBed } from '@angular/core/testing';

import { WiskyProductServiceService } from './wisky-product-service.service';

describe('WiskyProductServiceService', () => {
  let service: WiskyProductServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WiskyProductServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
