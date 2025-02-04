import { TaskService } from './../../../application/services/task.service';
import { TaskModel } from './../../../domain/models/task.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TaskItemSlidingComponent } from '../task-item-sliding/task-item-sliding.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [IonicModule, CommonModule, TaskItemSlidingComponent],
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<TaskModel[]>;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks$ = this.taskService.tasks$;
  }

  trackById(index: number, task: TaskModel): number {
    return task.id;
  }
}
