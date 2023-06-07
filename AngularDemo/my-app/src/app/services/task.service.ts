import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TASKS } from '../mock-tasks';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  // this method will get the details from the backend, hit the API and make the getall request, populate the results into the Tasks array
  getTask(): Observable<Task[]> {
    //const tasks = of(TASKS);
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTaskService(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  updateTaskList(task: Task): Observable<Task> {
    const url = `${this.apiUrl}`;
    return this.http.post<Task>(url, task, httpOptions);
  }
}
