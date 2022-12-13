import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Options } from "@angular-slider/ngx-slider";
import { FormsModule } from '@angular/forms';

import { InternalSearchComponent } from './internal-search.component';

import SearchEngine from "../../models/searchEngine";

describe('InternalSearchComponent', () => {
  let component: InternalSearchComponent;
  let fixture: ComponentFixture<InternalSearchComponent>;

  let defaultSearchEngine: SearchEngine = { productName: '', productDescription: "", productMinPrice: 0, productMaxPrice: 2000, productEmail: "", };
  let defaultSliderOptions: Options = {
    floor: 0,
    ceil: 2000
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternalSearchComponent],
      imports: [FormsModule, NgxSliderModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InternalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.onButtonSearchClicked, 'emit');
  });

  it('should create correct the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default values correctly', () => {
    expect(component.defaultSearchEngine).toEqual(defaultSearchEngine);
    expect(component.newSearchEngine).toEqual(defaultSearchEngine);
    expect(component.rangeSliderOptions).toEqual(defaultSliderOptions);
  })

  it(' onSubmit --> when call onSubmit and change the name, should emit only this change', () => {
    let changeDataInName: SearchEngine = { productName: 'Test', productDescription: "", productMinPrice: 0, productMaxPrice: 2000, productEmail: "", };
    let expectResult = { productName: 'Test' }

    component.newSearchEngine = changeDataInName;

    component.onSubmit();

    expect(component.onButtonSearchClicked.emit).toHaveBeenCalledWith(expectResult);
  })

  it('onSubmit --> when call onSubmit and change the min price, should emit only this change', () => {
    let changeDataInMinPrice: SearchEngine = { productName: '', productDescription: "", productMinPrice: 100, productMaxPrice: 2000, productEmail: "", };
    let expectResult = { productMinPrice: 100 }

    component.newSearchEngine = changeDataInMinPrice;

    component.onSubmit();

    expect(component.onButtonSearchClicked.emit).toHaveBeenCalledWith(expectResult);
  })

  it('onSubmit --> when call onSubmit and change the name and email, should emit only this changes', () => {
    let changeDataInNameAndEmail: SearchEngine = { productName: 'Test', productDescription: "", productMinPrice: 0, productMaxPrice: 2000, productEmail: "Prueba", };
    let expectResult = { productName: 'Test', productEmail: "Prueba" }

    component.newSearchEngine = changeDataInNameAndEmail;

    component.onSubmit();

    expect(component.onButtonSearchClicked.emit).toHaveBeenCalledWith(expectResult);
  })

  it('onSubmit --> when call onSubmit change all, should emit all the changes', () => {
    let changeInEverything: SearchEngine = { productName: 'Test', productDescription: "Esto es una prueba", productMinPrice: 10, productMaxPrice: 200, productEmail: "Prueba", };
    let expectResult: SearchEngine = { productName: 'Test', productDescription: "Esto es una prueba", productMinPrice: 10, productMaxPrice: 200, productEmail: "Prueba", };

    component.newSearchEngine = changeInEverything;

    component.onSubmit();

    expect(component.onButtonSearchClicked.emit).toHaveBeenCalledWith(expectResult);
  })

  it('onResetFilters --> when call onResetFilters reset by default our searchEngine widget', () => {
    let actualSearchEngine: SearchEngine = { productName: 'Test', productDescription: "Esto es una prueba", productMinPrice: 10, productMaxPrice: 200, productEmail: "Prueba", };

    component.newSearchEngine = actualSearchEngine

    component.onResetFilters();

    expect(component.newSearchEngine).toEqual(defaultSearchEngine)
    expect(component.onButtonSearchClicked.emit).toHaveBeenCalledWith({});
  })
});
