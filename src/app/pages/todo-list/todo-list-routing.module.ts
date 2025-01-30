import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListPage } from './todo-list.page';

const routes: Routes = [
  {
    path: '',
    component: TodoListPage
  },
  {
    path: 'task-edit',
    loadChildren: () => import('./task-edit/task-edit.module').then( m => m.TaskEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoListPageRoutingModule {}
