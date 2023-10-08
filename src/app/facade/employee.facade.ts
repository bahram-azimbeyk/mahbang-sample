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
      map(res => {
        return res.data.map((employee: any) => {
          return {
            id: employee.id,
            name: employee.employee_name,
            salary: employee.employee_salary,
            age: employee.employee_age
          }
        });
      })
    ).subscribe(employees => {
      this.state.setEmployeesList(employees);
    });
  }

  createEmployee(data: Partial<Employee>): void {
    this.api.createEmployee(data).pipe(
      map(res => res.data)
    ).subscribe(employee => {
      this.state.addEmployee(employee);
    });
  }

  editEmployee(id: string, data: any): void {
    this.api.updateEmployee(id, data).pipe(
      map(res => res.data)
    ).subscribe(employee => {
      this.state.updateEmployee(employee);
    });
  }

  deleteEmployee(id: string): void {
    this.api.deleteEmployee(id).subscribe(() => {
      this.state.deleteEmployee(id);
    });
  }
}
