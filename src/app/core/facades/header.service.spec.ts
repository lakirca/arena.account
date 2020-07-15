import { TestBed } from '@angular/core/testing';

import { HeaderFacade } from './header.facade';

describe('HeaderService', () => {
  let service: HeaderFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
