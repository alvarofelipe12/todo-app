import { TaskService } from './../../../application/services/task.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterByCategoryComponent } from './filter-by-category.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('FilterByCategoryComponent', () => {
  let component: FilterByCategoryComponent;
  let fixture: ComponentFixture<FilterByCategoryComponent>;
  let taskService: TaskService;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FilterByCategoryComponent],
      providers: [
        {
          provide: TaskService,
          useValue: {
            filterTasksByCategory: (categoryId?: number) => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterByCategoryComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call taskService.filterTasksByCategory with undefined when "No filter" is selected', () => {
    const taskServiceSpy = spyOn(
      taskService,
      'filterTasksByCategory'
    ).and.callThrough();

    const selectElement: HTMLIonSelectElement = debugElement.query(
      By.css('ion-select')
    ).nativeElement;
    selectElement.value = 0;
    selectElement.dispatchEvent(new Event('ionChange'));

    expect(taskServiceSpy).toHaveBeenCalledWith(undefined);
  });

  it('should call taskService.filterTasksByCategory with the correct category ID', () => {
    const taskServiceSpy = spyOn(
      taskService,
      'filterTasksByCategory'
    ).and.callThrough();
    const selectElement: HTMLIonSelectElement = debugElement.query(
      By.css('ion-select')
    ).nativeElement;

    component.categories$ = of([{ id: 1, name: 'Work' }]);
    selectElement.value = 1;
    selectElement.dispatchEvent(new Event('ionChange'));

    expect(taskServiceSpy).toHaveBeenCalledWith(1);
  });

  it('should have "No filter" option selected by default', () => {
    const selectElement: HTMLIonSelectElement = debugElement.query(
      By.css('ion-select')
    ).nativeElement;
    expect(selectElement.value).toBe(0);
  });

  it('should display categories from the input', () => {
    component.categories$ = of([
      { id: 1, name: 'Work' },
      { id: 2, name: 'Personal' },
    ]);
    fixture.detectChanges();

    const options = debugElement.queryAll(By.css('ion-select-option'));
    expect(options.length).toBe(3);
    expect(options[1].nativeElement.textContent.trim()).toBe('Work');
    expect(options[2].nativeElement.textContent.trim()).toBe('Personal');
  });
});
