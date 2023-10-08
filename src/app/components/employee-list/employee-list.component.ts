import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFacade } from '../../facade/employee.facade';
import { Employee } from '../../models/employee.model';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Partial<Employee>[] = [];

  displayedColumns: string[] = ['name', 'salary', 'age', 'actions'];

  constructor(private employeeFacade: EmployeeFacade, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeFacade.getAllEmployees().subscribe(data => {
      // this.employees = data['data'];
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: { state: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeFacade.addEmployee(result).subscribe(() => {
          this.loadEmployees();
        });
      }
    });
  }

  openEditDialog(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: { state: 'edit', employee: employee }
    });

    dialogRef.afterClosed().subscribe((result: Employee) => {
      if (result) {
        this.employeeFacade.editEmployee(employee.id, result).subscribe(() => {
          this.loadEmployees();
        });
      }
    });
  }

  deleteEmployee(id: string) {
    this.employeeFacade.removeEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }
}
