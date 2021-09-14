import { TestBed } from '@angular/core/testing';

import { PokemonInterceptorService } from './pokemon-interceptor.service';

describe('PokemonInterceptorService', () => {
  let service: PokemonInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
