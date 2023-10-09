import { TestBed } from '@angular/core/testing';
import { EmployeeFacade } from './employee.facade';
import { ApiService } from '../apis/api.service';
import { EmployeeState } from '../states/employee-state';
import { of } from 'rxjs';

describe('EmployeeFacade', () => {
  let facade: EmployeeFacade;
  let mockApiService: any;
  let mockEmployeeState: any;

  beforeEach(() => {
    mockApiService = {
      getEmployees: jasmine.createSpy('getEmployees').and.returnValue(of({ data: [] })),
      createEmployee: jasmine.createSpy('createEmployee').and.returnValue(of({ data: {} })),
      updateEmployee: jasmine.createSpy('updateEmployee').and.returnValue(of({ data: {} })),
      deleteEmployee: jasmine.createSpy('deleteEmployee').and.returnValue(of({}))
    };

    mockEmployeeState = {
      getEmployeesList$: jasmine.createSpy('getEmployeesList$').and.returnValue(of([])),
      setEmployeesList: jasmine.createSpy('setEmployeesList'),
      addEmployee: jasmine.createSpy('addEmployee'),
      updateEmployee: jasmine.createSpy('updateEmployee'),
      deleteEmployee: jasmine.createSpy('deleteEmployee')
    };

    TestBed.configureTestingModule({
      providers: [
        EmployeeFacade,
        { provide: ApiService, useValue: mockApiService },
        { provide: EmployeeState, useValue: mockEmployeeState }
      ]
    });

    facade = TestBed.inject(EmployeeFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should load all employees', () => {
    facade.loadAllEmployees();
    expect(mockApiService.getEmployees).toHaveBeenCalled();
    expect(mockEmployeeState.setEmployeesList).toHaveBeenCalled();
  });

  it('should create an employee', () => {
    const dummyEmployee = { name: 'John', salary: '50000', age: '30' };
    facade.createEmployee(dummyEmployee);
    expect(mockApiService.createEmployee).toHaveBeenCalledWith(dummyEmployee);
    expect(mockEmployeeState.addEmployee).toHaveBeenCalled();
  });

  it('should edit an employee', () => {
    const dummyEmployee = { id: '1', name: 'John Updated', salary: '55000', age: '31' };
    facade.editEmployee('1', dummyEmployee);
    expect(mockApiService.updateEmployee).toHaveBeenCalledWith('1', dummyEmployee);
    expect(mockEmployeeState.updateEmployee).toHaveBeenCalled();
  });

  it('should delete an employee', () => {
    facade.deleteEmployee('1');
    expect(mockApiService.deleteEmployee).toHaveBeenCalledWith('1');
    expect(mockEmployeeState.deleteEmployee).toHaveBeenCalled();
  });
});
