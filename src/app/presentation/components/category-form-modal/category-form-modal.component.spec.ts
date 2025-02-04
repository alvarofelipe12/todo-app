import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { CategoryFormModalComponent } from './category-form-modal.component';
import { CategoryModel } from '../../../domain/models/category.model';
import { DebugElement } from '@angular/core';

describe('CategoryFormModalComponent', () => {
  let component: CategoryFormModalComponent;
  let fixture: ComponentFixture<CategoryFormModalComponent>;
  let debugElement: DebugElement;
  let modalCtrl: ModalController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CategoryFormModalComponent],
      providers: [
        {
          provide: ModalController,
          useValue: {
            dismiss: () => Promise.resolve(),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFormModalComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    modalCtrl = debugElement.injector.get(ModalController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty category name if no category is provided', () => {
    expect(component.categoryName).toBe('');
  });

  it('should initialize with category name if category is provided', () => {
    const category: CategoryModel = { id: 1, name: 'Test Category' };
    component.category = category;
    component.ngOnInit();
    expect(component.categoryName).toBe('Test Category');
  });

  it('should close modal on closeModal()', () => {
    const dismissSpy = spyOn(modalCtrl, 'dismiss').and.callThrough();
    component.closeModal();
    expect(dismissSpy).toHaveBeenCalled();
  });

  it('should save the category name and close the modal when saveCategory is called', () => {
    const dismissSpy = spyOn(modalCtrl, 'dismiss').and.callThrough();
    component.categoryName = 'New Category';
    fixture.detectChanges();
    component.saveCategory();
    expect(dismissSpy).toHaveBeenCalledWith({
      categoryName: 'New Category',
    });
  });

  it('should return true for isNameInvalid if category name is empty or whitespace', () => {
    component.categoryName = '';
    expect(component.isNameInvalid()).toBeTrue();
    component.categoryName = '   ';
    expect(component.isNameInvalid()).toBeTrue();
  });

  it('should return false for isNameInvalid if category name is not empty', () => {
    component.categoryName = 'Valid Name';
    expect(component.isNameInvalid()).toBeFalse();
  });
});
