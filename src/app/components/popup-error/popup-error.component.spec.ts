import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { PopupErrorComponent } from './popup-error.component';

describe('PopupErrorComponent', () => {
  let component: PopupErrorComponent;
  let fixture: ComponentFixture<PopupErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupErrorComponent],
      imports: [FontAwesomeModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PopupErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create correct the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default values correctly', () => {
    expect(component.iconCross).toBe(faCircleXmark);
  })
});
