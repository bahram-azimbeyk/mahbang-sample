import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

export class EmployeeState {

  private employees$ = new BehaviorSubject<Employee[]>([]);

  getEmployeesList$(): Observable<Employee[]> {
    return this.employees$.asObservable();
  }

  setEmployeesList(employees: Employee[]): void {
    this.employees$.next(employees);
  }

  addEmployee(employee: Employee): void {
    const employees = this.employees$.getValue();
    employees.push(employee);
    this.employees$.next(employees);
  }

  updateEmployee(updatedEmployee: Employee): void {
    const employees = this.employees$.getValue();
    const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
    employees[index] = updatedEmployee;
    this.employees$.next(employees);
  }

  deleteEmployee(id: string): void {
    const employees = this.employees$.getValue();
    employees.filter(emp => emp.id !== id);
    this.employees$.next(employees);
  }
}
