import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { CategoriesListComponent } from '../../components/categories-list/categories-list.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CategoriesPageRoutingModule,
    PageHeaderComponent,
    CategoriesListComponent
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
