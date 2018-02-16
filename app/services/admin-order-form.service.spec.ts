import { TestBed, inject } from '@angular/core/testing';

import { AdminOrderFormService } from './admin-order-form.service';

describe('AdminOrderFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminOrderFormService]
    });
  });

  it('should be created', inject([AdminOrderFormService], (service: AdminOrderFormService) => {
    expect(service).toBeTruthy();
  }));
});
