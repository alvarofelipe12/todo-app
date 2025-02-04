import { TaskService } from './../../../application/services/task.service';
import { TaskModel } from './../../../domain/models/task.model';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, IonItemSliding } from '@ionic/angular';
import { CategoryAssignorForTaskComponent } from '../category-assignor-for-task/category-assignor-for-task.component';

@Component({
  selector: 'app-task-item-sliding',
  templateUrl: './task-item-sliding.component.html',
  styleUrls: ['./task-item-sliding.component.scss'],
  imports: [IonicModule, CommonModule, CategoryAssignorForTaskComponent],
})
export class TaskItemSlidingComponent implements OnInit {
  @Input() task!: TaskModel;

  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  toggleTask(id: number, slidingItem: IonItemSliding) {
    this.taskService.toggleTask(id);
    slidingItem.close();
  }

  deleteTask(id: number, slidingItem: IonItemSliding) {
    this.taskService.deleteTask(id);
    slidingItem.close();
  }
}
