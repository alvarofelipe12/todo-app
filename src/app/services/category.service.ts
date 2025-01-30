import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: CategoryModel[] = [];
  private categoriesSubject = new BehaviorSubject<CategoryModel[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor() {
    this.loadCategories();
  }

  private saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
    this.categoriesSubject.next([...this.categories]);
  }

  private loadCategories() {
    const data = localStorage.getItem('categories');
    this.categories = data ? JSON.parse(data) : [];
    this.categoriesSubject.next([...this.categories]);
  }

  addCategory(name: string) {
    if (!name.trim()) return;
    const newCategory: CategoryModel = { id: Date.now(), name };
    this.categories.push(newCategory);
    this.saveCategories();
  }

  deleteCategory(id: number) {
    this.categories = this.categories.filter((t) => t.id !== id);
    this.saveCategories();
  }

  updateCategory(id: number, name: string) {
    const category = this.categories.find((c) => c.id === id);
    if (category) {
      category.name = name;
      this.saveCategories();
    }
  }
}
