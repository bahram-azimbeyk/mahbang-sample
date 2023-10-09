import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve employees', () => {
    const dummyEmployees = [
      { id: '1', employee_name: 'John', employee_salary: '50000', employee_age: '30', profile_image: '' },
      { id: '2', employee_name: 'Jane', employee_salary: '60000', employee_age: '25', profile_image: '' }
    ];

    service.getEmployees().subscribe(employees => {
      expect(employees.length).toBe(2);
      expect(employees).toEqual(dummyEmployees);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/employees`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEmployees);
  });

  it('should retrieve employee by id', () => {
    const dummyEmployee = { id: '1', employee_name: 'John', employee_salary: '50000', employee_age: '30', profile_image: '' };

    service.getEmployeeById('1').subscribe(employee => {
      expect(employee).toEqual(dummyEmployee);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/employee/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEmployee);
  });

  it('should create an employee', () => {
    const newEmployee = { name: 'John', salary: '50000', age: '30' };

    service.createEmployee(newEmployee).subscribe(employee => {
      expect(employee).toEqual(newEmployee);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/create`);
    expect(req.request.method).toBe('POST');
    req.flush(newEmployee);
  });

  it('should update an employee', () => {
    const updatedEmployee = { name: 'John Updated', salary: '55000', age: '31' };

    service.updateEmployee('1', updatedEmployee).subscribe(employee => {
      expect(employee).toEqual(updatedEmployee);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/update/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedEmployee);
  });

  it('should delete an employee', () => {
    service.deleteEmployee('1').subscribe(response => {
      expect(response).toEqual({ status: 'success' });
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ status: 'success' });
  });
});
