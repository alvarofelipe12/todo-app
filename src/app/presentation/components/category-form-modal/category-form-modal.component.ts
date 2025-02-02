import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CategoryModel } from '../../../domain/models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form-modal',
  templateUrl: './category-form-modal.component.html',
  styleUrls: ['./category-form-modal.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class CategoryFormModalComponent implements OnInit {
  @Input() category?: CategoryModel;
  categoryName = '';
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (this.category) {
      this.categoryName = this.category.name;
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  saveCategory() {
    this.modalController.dismiss({ categoryName: this.categoryName });
  }

  isNameInvalid() {
    return !this.categoryName.trim().length;
  }
}
