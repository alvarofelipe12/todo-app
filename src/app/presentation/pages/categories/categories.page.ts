import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { IonItemSliding, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../../domain/models/category.model';
import { CategoryService } from '../../../application/services/category.service';
import { CategoryFormModalComponent } from '../../components/category-form-modal/category-form-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPage implements OnInit {
  categories$!: Observable<CategoryModel[]>;
  pageTitle = 'Categories';
  addCategoryIconName = 'add-outline';
  addCategoryButtonLabel = 'Add';

  constructor(
    private categoryService: CategoryService,
    private changeDetectorRef: ChangeDetectorRef,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.categories$;
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id);
    this.changeDetectorRef.markForCheck();
  }

  trackById(index: number, category: CategoryModel): number {
    return category.id;
  }

  openCategoryModal(category?: CategoryModel) {
    this.modalController
      .create({
        component: CategoryFormModalComponent,
        componentProps: { category },
      })
      .then((modal) => {
        modal.present();
        return modal.onWillDismiss();
      })
      .then((result) => {
        if (result.data) {
          if (category) {
            this.categoryService.updateCategory(
              category.id,
              result.data.categoryName
            );
          } else {
            this.categoryService.addCategory(result.data.categoryName);
          }
          this.changeDetectorRef.markForCheck();
        }
      });
  }
}
