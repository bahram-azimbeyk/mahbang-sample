import { Injectable } from '@angular/core';
import { ApiService } from '../apis/api.service';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFacade {

  constructor(private apiService: ApiService) { }

  getAllEmployees() {
    return this.apiService.getEmployees();
  }

  getEmployeeDetails(id: string) {
    return this.apiService.getEmployeeById(id);
  }

  addEmployee(data: Partial<Employee>) {
    return this.apiService.createEmployee(data);
  }

  editEmployee(id: string, data: Partial<Employee>) {
    return this.apiService.updateEmployee(id, data);
  }

  removeEmployee(id: string) {
    return this.apiService.deleteEmployee(id);
  }
}
