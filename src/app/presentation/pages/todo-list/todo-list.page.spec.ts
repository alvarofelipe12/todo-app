import { environment } from './../../../../environments/environment';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListPage } from './todo-list.page';
import { IonicModule } from '@ionic/angular';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('TodoListPage', () => {
  let component: TodoListPage;
  let fixture: ComponentFixture<TodoListPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListPage],
      imports: [IonicModule.forRoot()],
      providers: [provideFirebaseApp(() => initializeApp({ ...environment.firebase }))],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
