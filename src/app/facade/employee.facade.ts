import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '../apis/api.service';
import { EmployeeState } from '../states/employee-state';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFacade {

  constructor(private api: ApiService, private state: EmployeeState) { }

  getEmployeesList$(): Observable<Employee[]> {
    return this.state.getEmployeesList$();
  }

  loadAllEmployees(): void {
    this.api.getEmployees().pipe(
      map(data => {
        const employees = data['data'] as Employee[];
        this.state.setEmployeesList(employees);
      })
    );
  }

  createEmployee(data: Partial<Employee>): void {
    this.api.createEmployee(data).pipe(
      map(data => {
        const employee = data['data'] as Employee;
        this.state.addEmployee(employee);
      })
    );
  }

  editEmployee(id: string, data: any): void {
    this.api.updateEmployee(id, data).pipe(
      map(data => {
        const employee = data['data'] as Employee;
        this.state.updateEmployee(employee);
      })
    );
  }

  deleteEmployee(id: string): void {
    this.api.deleteEmployee(id).subscribe(() => {
      this.state.deleteEmployee(id);
    });
  }
}
