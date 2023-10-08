import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get(`${this.baseUrl}/employee`);
  }

  getEmployeeById(id: number) {
    return this.http.get(`${this.baseUrl}/employee/${id}`);
  }

  createEmployee(data: Partial<Employee>) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  updateEmployee(id: number, data: Partial<Employee>) {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
