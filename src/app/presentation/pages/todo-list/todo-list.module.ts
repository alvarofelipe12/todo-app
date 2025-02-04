import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoListPageRoutingModule } from './todo-list-routing.module';

import { TodoListPage } from './todo-list.page';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { AddTaskInputComponent } from '../../components/add-task-input/add-task-input.component';
import { FilterByCategoryComponent } from '../../components/filter-by-category/filter-by-category.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoListPageRoutingModule,
    PageHeaderComponent,
    AddTaskInputComponent,
    FilterByCategoryComponent,
    TaskListComponent
  ],
  declarations: [TodoListPage],
})
export class TodoListPageModule {}
