import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { combineLatest, Observable, Subscription, tap } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { TaskModel } from 'src/app/models/task.model';
import { CategoryService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  standalone: false,
})
export class TodoListPage implements OnInit, OnDestroy {
  tasks$!: Observable<TaskModel[]>;
  newTaskTitle = '';
  categories$!: Observable<CategoryModel[]>;
  categoryDeletionsSub?: Subscription;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.tasks$ = this.taskService.tasks$;
    this.categories$ = this.categoryService.categories$;

    // Detect category deletions and remove them from tasks
    this.categoryDeletionsSub = combineLatest([this.tasks$, this.categories$])
      .pipe(
        tap(([tasks, categories]) => {
          // Get all existing category ids
          const categoryIds = new Set(categories.map((c) => c.id));
          tasks
            // Find tasks with deleted categories
            .filter(
              (task) => task.category && !categoryIds.has(task.category.id)
            )
            // iterating after the filter result to remove categories on the given tasks
            .forEach(({ id }) => {
              this.taskService.removeCategoryOnTask(undefined, id);
            });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.categoryDeletionsSub) {
      this.categoryDeletionsSub.unsubscribe();
    }
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

  handleChange(event: Event, taskId: number) {
    const target = event.target as HTMLIonSelectElement;
    const categoryId = target.value as number;
    this.taskService.udpateCategoryOnTask(taskId, categoryId);
  }
}
