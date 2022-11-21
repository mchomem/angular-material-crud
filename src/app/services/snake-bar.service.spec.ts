import { TestBed } from '@angular/core/testing';

import { SnakeBarService } from './snake-bar.service';

describe('SnakeBarService', () => {
  let service: SnakeBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnakeBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
