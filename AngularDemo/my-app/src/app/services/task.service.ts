import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { TASKS } from '../mock-tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  // this method will get the details from the backend, hit the API and make the getall request, populate the results into the Tasks array
  getTask(): Task[] {
    console.log(TASKS);
    return TASKS;
  }
}
