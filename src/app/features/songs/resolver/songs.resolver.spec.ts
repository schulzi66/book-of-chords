import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { songsResolver } from './songs.resolver';

describe('songsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => songsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
