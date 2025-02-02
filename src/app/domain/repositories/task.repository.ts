export abstract class TaskRepository {
  abstract addTask(title: string): void;
  abstract toggleTask(id: number): void;
  abstract deleteTask(id: number): void;
  abstract assignCategoryOnTask(idTask: number, idCategory: number): void;
  abstract removeCategoryOnTask(idTask?: number, categoryId?: number): void;
  abstract filterTasksByCategory(categoryId?: number): void;
}
