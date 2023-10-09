import { TestBed } from '@angular/core/testing';
import { EmployeeState } from './employee-state';
import { Employee } from '../models/employee.model';

describe('EmployeeState', () => {
  let service: EmployeeState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeState]
    });

    service = TestBed.inject(EmployeeState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve employees list', (done) => {
    service.getEmployeesList$().subscribe(employees => {
      expect(employees).toEqual([]);
      done();
    });
  });

  it('should set employees list', () => {
    const dummyEmployees: Employee[] = [
      { id: '1', name: 'John', salary: '50000', age: '30' }
    ];

    service.setEmployeesList(dummyEmployees);

    service.getEmployeesList$().subscribe(employees => {
      expect(employees).toEqual(dummyEmployees);
    });
  });

  it('should add an employee', () => {
    const newEmployee: Employee = { id: '2', name: 'Jane', salary: '60000', age: '25' };

    service.addEmployee(newEmployee);

    service.getEmployeesList$().subscribe(employees => {
      expect(employees.length).toBe(1);
      expect(employees).toContain(newEmployee);
    });
  });

  it('should delete an employee', () => {
    service.deleteEmployee('1');

    service.getEmployeesList$().subscribe(employees => {
      const employee = employees.find(emp => emp.id === '1');
      expect(employee).toBeUndefined();
    });
  });
});
