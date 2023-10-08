import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFacade } from '../../facade/employee.facade';
import { Employee } from '../../models/employee.model';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  employees: Partial<Employee>[] = [];

  subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['name', 'salary', 'age', 'actions'];

  constructor(private employeeFacade: EmployeeFacade, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.setSubscription();
  }

  loadEmployees(): void {
    this.employeeFacade.loadAllEmployees()
  }

  setSubscription(): void {
    this.subscriptions.push(
      this.employeeFacade.getEmployeesList$().subscribe(employees => {
        this.employees = employees;
      })
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: { state: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeFacade.createEmployee(result)
      }
    });
  }

  openEditDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: { state: 'edit', employee: employee }
    });

    dialogRef.afterClosed().subscribe((result: Employee) => {
      if (result) {
        this.employeeFacade.editEmployee(employee.id, result)
      }
    });
  }

  deleteEmployee(id: string): void {
    this.employeeFacade.deleteEmployee(id)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
