import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonItemSliding, IonModal } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPage implements OnInit {
  categories$!: Observable<CategoryModel[]>;
  categorySelected?: CategoryModel;
  categoryName = '';
  @ViewChild('categoryModal') categoryModal!: IonModal;

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.categories$;
  }

  addCategory(name: string) {
    this.categoryService.addCategory(name);
    this.cdr.markForCheck();
  }

  deleteCategory(id: number, slidingItem: IonItemSliding) {
    this.categoryService.deleteCategory(id);
    slidingItem.close();
    this.cdr.markForCheck();
  }

  trackById(index: number, category: CategoryModel): number {
    return category.id;
  }

  openNewCategoryModal() {
    this.categorySelected = undefined; // Ensure it's a new category
    this.categoryName = '';
    this.categoryModal.present();
    this.cdr.markForCheck();
  }

  openEditCategoryModal(category: CategoryModel, slidingItem: IonItemSliding) {
    this.categorySelected = { ...category };
    this.categoryName = category.name;
    slidingItem.close();
    this.categoryModal.present();
    this.cdr.markForCheck();
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      if (this.categorySelected) {
        this.categoryService.updateCategory(
          this.categorySelected.id,
          this.categoryName
        );
      } else {
        this.categoryService.addCategory(this.categoryName);
      }
    }

    this.categorySelected = undefined;
    this.categoryName = '';
    this.cdr.markForCheck();
  }
}
