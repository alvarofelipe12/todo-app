import { TaskService } from './../../../application/services/task.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskItemSlidingComponent } from './task-item-sliding.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TaskItemSlidingComponent', () => {
  let component: TaskItemSlidingComponent;
  let fixture: ComponentFixture<TaskItemSlidingComponent>;
  let taskService: TaskService;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), TaskItemSlidingComponent],
      providers: [
        {
          provide: TaskService,
          useValue: {
            toggleTask: (id: number) => {},
            deleteTask: (id: number) => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemSlidingComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    taskService = TestBed.inject(TaskService);
    component.task = { id: 1, title: 'Test Task', completed: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task title', () => {
    const label = debugElement.query(By.css('ion-label'))
      .nativeElement as HTMLIonLabelElement;
    expect(label.innerText).toBe('Test Task');
  });

  it('should have completed class if task is completed', () => {
    component.task = { id: 1, title: 'Test Task', completed: true };
    fixture.detectChanges();
    const item = debugElement.query(By.css('ion-item')).nativeElement;
    expect(item.classList).toContain('completed');
  });

  it('should not have completed class if task is not completed', () => {
    component.task = { id: 1, title: 'Test Task', completed: false };
    fixture.detectChanges();
    const item = debugElement.query(By.css('ion-item')).nativeElement;
    expect(item.classList).not.toContain('completed');
  });

  it('should call toggleTask on taskService when toggle button is clicked', () => {
    const taskServiceSpy = spyOn(taskService, 'toggleTask').and.callThrough();
    component.task = { id: 1, title: 'Test Task', completed: false };
    fixture.detectChanges();
    const toggleButton = debugElement.query(By.css('ion-item-option'))
      .nativeElement as HTMLIonItemOptionElement;
    toggleButton.click();
    expect(taskServiceSpy).toHaveBeenCalledWith(1);
  });

  it('should call deleteTask on taskService when delete button is clicked', () => {
    const taskServiceSpy = spyOn(taskService, 'deleteTask').and.callThrough();
    component.task = { id: 1, title: 'Test Task', completed: false };
    fixture.detectChanges();
    const deleteButton = debugElement.queryAll(By.css('ion-item-option'))[1]
      .nativeElement as HTMLIonItemOptionElement;
    deleteButton.click();
    expect(taskServiceSpy).toHaveBeenCalledWith(1);
  });
});
