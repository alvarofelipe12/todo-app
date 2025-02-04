import { CategoryService } from '../../../application/services/category.service';
import { TaskModel } from '../../../domain/models/task.model';
import { TaskService } from '../../../application/services/task.service';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../../domain/models/category.model';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-assignor-for-task',
  templateUrl: './category-assignor-for-task.component.html',
  styleUrls: ['./category-assignor-for-task.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class CategoryAssignorForTaskComponent implements OnInit {
  @Input() task!: TaskModel;
  categories$!: Observable<CategoryModel[]>;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.categories$;
  }

  handleChange(event: Event, taskId: number) {
    const target = event.target as HTMLIonSelectElement;
    const categoryId = target.value as number;
    this.taskService.udpateCategoryOnTask(taskId, categoryId);
  }

  trackById(index: number, category: CategoryModel): number {
    return category.id;
  }
}
