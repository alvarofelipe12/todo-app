import { Injectable } from '@angular/core';
import { CategoryModel } from '../../domain/models/category.model';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/infrastructure/storage/local-storage.service';
import { CategoryRepository } from '../../domain/repositories/category.repository';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CategoryRepository {
  private categories: CategoryModel[] = [];
  private categoriesSubject = new BehaviorSubject<CategoryModel[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    super();
    this.loadCategories();
  }

  private saveCategories(): void {
    this.localStorageService.saveData('categories', this.categories);
    this.categoriesSubject.next([...this.categories]);
  }

  private loadCategories(): void {
    this.categories =
      this.localStorageService.getData<CategoryModel[]>('categories');
    this.categoriesSubject.next([...this.categories]);
  }

  addCategory(name: string): void {
    if (!name.trim()) return;
    const newCategory: CategoryModel = { id: Date.now(), name };
    this.categories.push(newCategory);
    this.saveCategories();
  }

  deleteCategory(id: number): void {
    this.categories = this.categories.filter((t) => t.id !== id);
    this.saveCategories();
  }

  updateCategory(id: number, name: string): void {
    const category = this.categories.find((c) => c.id === id);
    if (category) {
      category.name = name;
      this.saveCategories();
    }
  }
}
