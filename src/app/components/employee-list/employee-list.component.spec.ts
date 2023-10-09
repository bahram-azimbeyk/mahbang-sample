import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeFacade } from '../../facade/employee.facade';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let mockEmployeeFacade: any;
  let mockDialog: any;

  beforeEach(async () => {
    mockEmployeeFacade = {
      loadAllEmployees: jasmine.createSpy('loadAllEmployees'),
      getEmployeesList$: jasmine.createSpy('getEmployeesList$').and.returnValue(of([
        { id: '1', employee_name: 'John', employee_salary: '50000', employee_age: '30', profile_image: '' },
        { id: '2', employee_name: 'Jane', employee_salary: '60000', employee_age: '25', profile_image: '' }
      ])),
      createEmployee: jasmine.createSpy('createEmployee'),
      editEmployee: jasmine.createSpy('editEmployee'),
      deleteEmployee: jasmine.createSpy('deleteEmployee')
    };

    mockDialog = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(null)
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [EmployeeListComponent],
      providers: [
        { provide: EmployeeFacade, useValue: mockEmployeeFacade },
        { provide: MatDialog, useValue: mockDialog }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees on initialization', () => {
    expect(mockEmployeeFacade.loadAllEmployees).toHaveBeenCalled();
    expect(component.employees.length).toBe(2);
  });

  it('should open create dialog', () => {
    component.openCreateDialog();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should open edit dialog', () => {
    const employee = { id: '1', name: 'John', salary: '50000', age: '30', profile_image: '' };
    component.openEditDialog(employee);
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should delete an employee', () => {
    component.deleteEmployee('1');
    expect(mockEmployeeFacade.deleteEmployee).toHaveBeenCalledWith('1');
  });

  it('should unsubscribe on component destruction', () => {
    spyOn(component.subscriptions[0], 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscriptions[0].unsubscribe).toHaveBeenCalled();
  });
});
