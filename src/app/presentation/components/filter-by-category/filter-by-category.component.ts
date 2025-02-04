import { CategoryService } from './../../../application/services/category.service';
import { CommonModule } from '@angular/common';
import { TaskService } from './../../../application/services/task.service';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CategoryModel } from 'src/app/domain/models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-by-category',
  templateUrl: './filter-by-category.component.html',
  styleUrls: ['./filter-by-category.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class FilterByCategoryComponent implements OnInit {
  categories$!: Observable<CategoryModel[]>;
  categoryFilter: number = 0;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.categories$;
  }

  onFilterChange(event: Event): void {
    const target = event.target as HTMLIonSelectElement;
    const filterValue = target.value ? Number(target.value) : undefined;
    this.taskService.filterTasksByCategory(filterValue);
  }

  trackById(index: number, category: CategoryModel): number {
    return category.id;
  }
}
