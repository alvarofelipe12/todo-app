import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../models/task.model';
import { IonItemSliding } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tasks$!: Observable<TaskModel[]>;
  newTaskTitle = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks$ = this.taskService.tasks$;
  }

  addTask() {
    this.taskService.addTask(this.newTaskTitle);
    this.newTaskTitle = '';
  }

  toggleTask(id: number, slidingItem: IonItemSliding) {
    this.taskService.toggleTask(id);
    slidingItem.close();
  }

  deleteTask(id: number, slidingItem: IonItemSliding) {
    this.taskService.deleteTask(id);
    slidingItem.close();
  }
}
