import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: TaskModel[] = [];
  private tasksSubject = new BehaviorSubject<TaskModel[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private categoryService: CategoryService) {
    this.loadTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.tasksSubject.next([...this.tasks]);
  }

  private loadTasks() {
    const data = localStorage.getItem('tasks');
    this.tasks = data ? JSON.parse(data) : [];
    this.tasksSubject.next([...this.tasks]);
  }

  addTask(title: string) {
    if (!title.trim()) return;
    const newTask: TaskModel = { id: Date.now(), title, completed: false };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  toggleTask(id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.saveTasks();
  }

  assignCategoryOnTask(idTask: number, idCategory: number) {
    const task = this.tasks.find((t) => t.id === idTask);
    if (task) {
      this.categoryService.categories$.subscribe({
        next: (categories) => {
          task.category = categories.filter((c) => c.id !== idCategory)[0];
        },
        complete: () => {
          this.saveTasks();
        },
      });
    }
  }

  udpateCategoryOnTask(idTask: number, categoryId: number) {
    this.assignCategoryOnTask(idTask, categoryId);
  }

  removeCategoryOnTask(idTask: number) {
    const task = this.tasks.find((t) => t.id === idTask);
    if (task) {
      task.category = undefined;
      this.saveTasks();
    }
  }

  filterTasksByCategory(categoryId?: number) {
    let filteredTasks = [...this.tasks];
    if (categoryId) {
      filteredTasks = this.tasks.filter(
        (task) => task.category?.id === categoryId
      );
    }
    this.tasksSubject.next(filteredTasks);
  }
}
