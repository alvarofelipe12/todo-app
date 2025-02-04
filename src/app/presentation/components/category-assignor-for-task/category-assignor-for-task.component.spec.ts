import { TaskService } from '../../../application/services/task.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryAssignorForTaskComponent } from './category-assignor-for-task.component';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CategoryAssignorForTaskComponent', () => {
  let component: CategoryAssignorForTaskComponent;
  let fixture: ComponentFixture<CategoryAssignorForTaskComponent>;
  let debugElement: DebugElement;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CategoryAssignorForTaskComponent],
      providers: [
        {
          provide: TaskService,
          useValue: {
            udpateCategoryOnTask: (idTask: number, categoryId: number) => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryAssignorForTaskComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display categories from the input', () => {
    component.categories$ = of([
      { id: 1, name: 'Work' },
      { id: 2, name: 'Personal' },
    ]);
    component.task = {
      id: 1,
      title: 'Task',
      completed: false,
      category: undefined,
    };
    fixture.detectChanges();

    const options = debugElement.queryAll(By.css('ion-select-option'));
    expect(options.length).toBe(2);
    expect(options[0].nativeElement.textContent.trim()).toBe('Work');
    expect(options[1].nativeElement.textContent.trim()).toBe('Personal');
  });

  it('should call taskService.udpateCategoryOnTask with the correct category ID', () => {
    const category = { id: 1, name: 'Work' };
    component.categories$ = of([category]);
    component.task = {
      id: 1,
      title: 'Task',
      completed: false,
      category: undefined,
    };
    fixture.detectChanges();

    const taskServiceSpy = spyOn(
      taskService,
      'udpateCategoryOnTask'
    ).and.callThrough();
    const selectElement: HTMLIonSelectElement = debugElement.query(
      By.css('ion-select')
    ).nativeElement;
    selectElement.value = category.id;
    selectElement.dispatchEvent(new Event('ionChange'));

    expect(taskServiceSpy).toHaveBeenCalledWith(1, 1);
  });
});
