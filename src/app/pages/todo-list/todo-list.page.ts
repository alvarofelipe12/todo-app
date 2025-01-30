import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  standalone: false,
})
export class TodoListPage implements OnInit {
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

  trackById(index: number, task: TaskModel): number {
    return task.id;
  }
}
