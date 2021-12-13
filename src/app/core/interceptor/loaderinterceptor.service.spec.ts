import { TestBed } from '@angular/core/testing';

import { LoaderinterceptorService } from './loaderinterceptor.service';

describe('LoaderinterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderinterceptorService = TestBed.get(LoaderinterceptorService);
    expect(service).toBeTruthy();
  });
});
