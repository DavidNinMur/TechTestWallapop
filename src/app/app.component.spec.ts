import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { InternalSearchComponent } from './components/internal-search/internal-search.component';
import { PopupErrorComponent } from './components/popup-error/popup-error.component';
import { ProductViewComponent } from './views/product-view/product-view.component';
import { ModalComponent } from './components/modal/modal.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        FontAwesomeModule,
        NgxSliderModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        DropdownComponent,
        InternalSearchComponent,
        PopupErrorComponent,
        ProductViewComponent,
        ModalComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'wallaTechTest'`, () => {
    expect(component.title).toEqual('wallaTechTest');
  });
});
