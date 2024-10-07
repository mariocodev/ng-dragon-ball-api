import { TestBed } from '@angular/core/testing';

import { DragonBallService } from './dragon-ball.service';

describe('DragonBallService', () => {
  let service: DragonBallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragonBallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
