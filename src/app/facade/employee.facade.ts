import { Injectable } from '@angular/core';
import { ApiService } from '../apis/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFacade {

  constructor(private apiService: ApiService) { }

  getAllEmployees() {
    return this.apiService.getEmployees();
  }

  getEmployeeDetails(id: number) {
    return this.apiService.getEmployeeById(id);
  }

  addEmployee(data: any) {
    return this.apiService.createEmployee(data);
  }

  editEmployee(id: number, data: any) {
    return this.apiService.updateEmployee(id, data);
  }

  removeEmployee(id: number) {
    return this.apiService.deleteEmployee(id);
  }
}
