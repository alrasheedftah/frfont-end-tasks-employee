import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

var httpLink = {
  TaskLink: environment.apiUrl + "/api/tasks",
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http : HttpClient) { }

  getAllTask() {
    return this.http.get<any>(`${httpLink.TaskLink}`)
        .pipe(map(tasks => {
            return tasks;
        }));
  }

  saveTasks(model:any) {

    return this.http.post<any>(`${httpLink.TaskLink}`, model)
        .pipe(map(tasks => {
            localStorage.setItem('currentUser', JSON.stringify(tasks));
            return tasks;
        }));
  }

  getTasksDetailById(model:any) {
    return this.http.get<any>(`${httpLink.TaskLink}/${model}`)
        .pipe(map(tasks => {
            return tasks;
        }));
  }

  updateTasksById(id:any,model:any) {
    return this.http.put<any>(`${httpLink.TaskLink}/${id}`, model)
        .pipe(map(tasks => {
            return tasks;
        }));
  }

  deleteTasksById(id:any) {
    return this.http.delete<any>(`${httpLink.TaskLink}/${id}`)
        .pipe(map(tasks => {
            return tasks;
        }));
  }
  

}
