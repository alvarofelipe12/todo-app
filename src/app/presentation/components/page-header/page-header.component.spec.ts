import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageHeaderComponent } from './page-header.component';
import { By } from '@angular/platform-browser';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), PageHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page title', () => {
    component.pageTitle = 'Test Title';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(
      By.css('ion-title')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Test Title');
  });

  it('should not display the action button if showActionButton is false', () => {
    component.showActionButton = false;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('ion-button'));
    expect(buttonElement).toBeNull();
  });

  it('should display the action button if showActionButton is true', () => {
    component.showActionButton = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('ion-button'));
    expect(buttonElement).not.toBeNull();
  });

  it('should emit actionButtonRequest event when the action button is clicked', () => {
    spyOn(component.actionButtonRequest, 'emit');

    component.showActionButton = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(
      By.css('ion-button')
    ).nativeElement;
    buttonElement.click();

    expect(component.actionButtonRequest.emit).toHaveBeenCalled();
  });

  it('should set the action button icon and label correctly', () => {
    component.showActionButton = true;
    component.actionButtonIcon = 'add';
    component.actionButtonLabel = 'Add';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(
      By.css('ion-button')
    ).nativeElement;
    expect(buttonElement.getAttribute('aria-label')).toBe('Add');
  });
});
