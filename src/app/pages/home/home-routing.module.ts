import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/todo',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'tabs/todo',
        pathMatch: 'full',
      },
      {
        path: 'todo',
        loadChildren: () =>
          import('../todo-list/todo-list.module').then(
            (m) => m.TodoListPageModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('../categories/categories.module').then(
            (m) => m.CategoriesPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
