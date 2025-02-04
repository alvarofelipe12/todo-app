import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListPage } from './todo-list.page';
import { IonicModule } from '@ionic/angular';

describe('TodoListPage', () => {
  let component: TodoListPage;
  let fixture: ComponentFixture<TodoListPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
