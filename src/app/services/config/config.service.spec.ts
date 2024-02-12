import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } 
    from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ConfigService', () => {
  let service: ConfigService;
  let mockConfig = {
    mock: 'url://go.test'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config from json file', () => {

    const ctrl = TestBed.inject(HttpTestingController);
    
    service.init();

    const req = ctrl.expectOne('./config.json');
    req.flush(mockConfig);

    expect(service.config).toBe(of(mockConfig));

  });
});
