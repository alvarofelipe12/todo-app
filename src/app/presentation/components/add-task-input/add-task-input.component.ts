import { IonicModule } from '@ionic/angular';
import { TaskService } from './../../../application/services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task-input',
  templateUrl: './add-task-input.component.html',
  styleUrls: ['./add-task-input.component.scss'],
  imports: [IonicModule, FormsModule]
})
export class AddTaskInputComponent implements OnInit {
  newTaskTitle = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  addTask() {
    this.taskService.addTask(this.newTaskTitle);
    this.newTaskTitle = '';
  }
}
