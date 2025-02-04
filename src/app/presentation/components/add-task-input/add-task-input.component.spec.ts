import { TaskService } from './../../../application/services/task.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTaskInputComponent } from './add-task-input.component';
import { By } from '@angular/platform-browser';

describe('AddTaskInputComponent', () => {
  let component: AddTaskInputComponent;
  let fixture: ComponentFixture<AddTaskInputComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), AddTaskInputComponent],
      providers: [{ provide: TaskService, useValue: { addTask: () => {} } }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    taskService = fixture.componentRef.injector.get(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTask method of TaskService when add button is clicked', () => {
    const taskServiceSpy = spyOn(taskService, 'addTask').and.callThrough();
    component.newTaskTitle = 'Test Task';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(
      By.css('ion-button')
    ).nativeElement;
    buttonElement.click();

    expect(taskServiceSpy).toHaveBeenCalledWith('Test Task');
    expect(component.newTaskTitle).toBe('');
  });

  it('should disable add button when input is empty', () => {
    const buttonElement = fixture.debugElement.query(
      By.css('ion-button')
    ).nativeElement;
    expect(buttonElement.disabled).toBeTruthy();
  });

  it('should enable add button when input is not empty', () => {
    component.newTaskTitle = 'Test Task';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(
      By.css('ion-button')
    ).nativeElement;
    expect(buttonElement.disabled).toBeFalsy();
  });
});
