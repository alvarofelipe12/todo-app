import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from './category.service';
import { TaskModel } from '../../domain/models/task.model';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { LocalStorageService } from '../../infrastructure/storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends TaskRepository {
  private tasks: TaskModel[] = [];
  private tasksSubject = new BehaviorSubject<TaskModel[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(
    private categoryService: CategoryService,
    private localStorageService: LocalStorageService
  ) {
    super();
    this.loadTasks();
  }

  private saveTasks(): void {
    this.localStorageService.saveData('tasks', this.tasks);
    this.tasksSubject.next([...this.tasks]);
  }

  private loadTasks(): void {
    this.tasks = this.localStorageService.getData<TaskModel[]>('tasks');
    this.tasksSubject.next([...this.tasks]);
  }

  addTask(title: string): void {
    if (!title.trim()) {
      return;
    }
    const newTask: TaskModel = { id: Date.now(), title, completed: false };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  toggleTask(id: number): void {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.saveTasks();
  }

  assignCategoryOnTask(idTask: number, idCategory: number): void {
    const task = this.tasks.find((t) => t.id === idTask);
    if (task) {
      this.categoryService.categories$.subscribe({
        next: (categories) => {
          task.category = categories.filter((c) => c.id === idCategory)[0];
          this.saveTasks();
        },
      });
    }
  }

  udpateCategoryOnTask(idTask: number, categoryId: number): void {
    this.assignCategoryOnTask(idTask, categoryId);
  }

  removeCategoryOnTask(idTask?: number, categoryId?: number): void {
    if (typeof idTask === 'number') {
      const task = this.tasks.find((t) => t.id === idTask);
      if (task) {
        task.category = undefined;
        this.saveTasks();
      }
    } else {
      this.tasks = this.tasks.map((t) => {
        if (t.category?.id === categoryId) {
          t.category = undefined;
        }
        return t;
      });
    }
  }

  filterTasksByCategory(categoryId?: number): void {
    let filteredTasks = [...this.tasks];
    if (categoryId) {
      filteredTasks = this.tasks.filter(
        (task) => task.category?.id === categoryId
      );
    }
    this.tasksSubject.next(filteredTasks);
  }
}
