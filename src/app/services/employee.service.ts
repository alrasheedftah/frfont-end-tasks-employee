import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


var httpLink = {
  EmployeesLink: environment.apiUrl + "/api/employees",
}

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http : HttpClient) { }

  getAllEmployee() {
    return this.http.get<any>(`${httpLink.EmployeesLink}`)
        .pipe(map(employee => {
            return employee;
        }));
  }

  saveEmployee(model:any) {

    return this.http.post<any>(`${httpLink.EmployeesLink}`, {name : model.EmployeeName , TasksId:model.tasksEmployee})
        .pipe(map(employee => {
            localStorage.setItem('currentUser', JSON.stringify(employee));
            return employee;
        }));
  }

  getEmployeeDetailById(model:any) {
    return this.http.get<any>(`${httpLink.EmployeesLink}/${model}`)
        .pipe(map(employee => {
            return employee;
        }));
  }

  updateEmployeeById(id:any,model:any) {
    return this.http.put<any>(`${httpLink.EmployeesLink}/${id}`, {name : model.name , TasksId:model.tasks})
        .pipe(map(employee => {
            return employee;
        }));
  }

  deleteEmployeeById(id:any) {
    return this.http.delete<any>(`${httpLink.EmployeesLink}/${id}`)
        .pipe(map(employee => {
            return employee;
        }));
  }
  
}
