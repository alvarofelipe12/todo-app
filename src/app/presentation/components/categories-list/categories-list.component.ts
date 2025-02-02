import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule, IonItemSliding } from '@ionic/angular';
import { CategoryModel } from '../../../domain/models/category.model';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class CategoriesListComponent implements OnInit {
  @Input() categories: CategoryModel[] = [];
  @Output() editCategory = new EventEmitter<CategoryModel>();
  @Output() deleteCategory = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onDeleteCategory(id: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.deleteCategory.emit(id);
  }

  onOpenCategoryModal(category: CategoryModel, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.editCategory.emit(category);
  }

  trackById(index: number, category: CategoryModel): number {
    return category.id;
  }
}
