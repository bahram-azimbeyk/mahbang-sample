import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiInterceptor } from './api.interceptor';

describe('ApiInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mockSnackBar: any;

  beforeEach(() => {
    mockSnackBar = {
      open: jasmine.createSpy('open')
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that no requests are outstanding.
  });

  it('should handle server not responding error', () => {
    httpClient.get('/test').subscribe(
      () => fail('should have failed with a status 0 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(0);
      }
    );

    const req: TestRequest = httpTestingController.expectOne('/test');
    req.error(new ErrorEvent('Network error'));

    expect(mockSnackBar.open).toHaveBeenCalledWith('Server is not responding, please try again later', 'Dismiss', jasmine.any(Object));
  });

  it('should handle too many requests error', () => {
    httpClient.get('/test').subscribe(
      () => fail('should have failed with a status 429 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(429);
      }
    );

    const req: TestRequest = httpTestingController.expectOne('/test');
    req.flush({}, { status: 429, statusText: 'Too Many Requests' });

    expect(mockSnackBar.open).toHaveBeenCalledWith('Too many requests, please try again later', 'Dismiss', jasmine.any(Object));
  });

  // You can add more tests for other error scenarios or any other specific behavior of the interceptor.
});
