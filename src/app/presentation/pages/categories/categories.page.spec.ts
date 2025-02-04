import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesPage } from './categories.page';
import { IonicModule, ModalController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CategoriesPage', () => {
  let component: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CategoriesPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ModalController,
          useValue: {
            create: () => {
              return { present: () => Promise.resolve() };
            },
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
