import { TestBed } from '@angular/core/testing';

import { HeaderState } from './header.state';

describe('HeaderService', () => {
  let service: HeaderState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
