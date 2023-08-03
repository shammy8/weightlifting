import { TestBed } from '@angular/core/testing';

import { PocketBaseCrudService } from './pocket-base-crud.service';

describe('PocketbaseCrudService', () => {
  let service: PocketBaseCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketBaseCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
