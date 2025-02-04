import { TaskModel } from './../../../domain/models/task.model';
import { TaskService } from './../../../application/services/task.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskListComponent } from './task-list.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), TaskListComponent],
      providers: [
        {
          provide: TaskService,
          useValue: {
            tasks$: of([
              { id: 1, title: 'Task 1', completed: false },
              { id: 2, title: 'Task 2', completed: true },
            ]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tasks when tasks$ has data', () => {
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(
      By.css('app-task-item-sliding')
    );
    expect(items.length).toBe(2);
  });

  it('should display "No results found..." when tasks$ is empty', () => {
    component.tasks$ = of([]);
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(message.textContent).toContain('No results found...');
  });

  it('should track tasks by id', () => {
    const task1: TaskModel = { id: 1, title: 'Task 1', completed: false };
    const task2: TaskModel = { id: 2, title: 'Task 2', completed: true };
    expect(component.trackById(0, task1)).toBe(task1.id);
    expect(component.trackById(1, task2)).toBe(task2.id);
  });
});
