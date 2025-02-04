import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  standalone: false,
})
export class TodoListPage {
  pageTitle = 'To-Do List';

  constructor() {}
}
