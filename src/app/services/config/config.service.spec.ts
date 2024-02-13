import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting }
  from '@angular/common/http/testing';


describe('ConfigService', () => {
  let service: ConfigService;
  let httpCtrl: HttpTestingController;
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
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpCtrl.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config from json file once loadConfig is called', (done) => {

    service.init().subscribe(() => {
      expect(service['_config']).toEqual(mockConfig);
      done();
    });

    const req = httpCtrl.expectOne(service['configUrl']);
    req.flush(mockConfig);
  });


  it('should throw error if the config file cannot be loaded', (done) => {
    const mockErrorResponse = { status: 404, statusText: 'Not found' };

    service.init().subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      }
    });
    const req = httpCtrl.expectOne(service['configUrl']);
    req.flush(new ErrorEvent('not found'), mockErrorResponse);

  });

});
