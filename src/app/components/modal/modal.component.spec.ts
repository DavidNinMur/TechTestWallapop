import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ModalComponent } from './modal.component';
import { faStar, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import { DEFAULT_FAV_PRODUCTS_LIST, FILTERED_FAV_PRODUCTS_LIST, ADD_ONE_FAV_PRODUCTS_LIST } from "./test-data/modalTestData"

import ProductFrontend from 'src/app/models/productFrontEnd';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [FontAwesomeModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create correct the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default values correctly', () => {
    expect(component.favoriteProductsList).toEqual([]);
    expect(component.filteredFavoriteProductsList).toEqual([]);
    expect(component.originalFavoriteProductsList).toEqual([]);
    expect(component.iconStar).toBe(faStar);
    expect(component.iconCross).toBe(faCircleXmark);
    expect(component.nameSearched).toBe('');
    expect(component.showModal).toBeFalse();
  })

  it('ngDoCheck --> when the input data changes', () => {
    component.favoriteProductsList = ADD_ONE_FAV_PRODUCTS_LIST;
    component.filteredFavoriteProductsList = DEFAULT_FAV_PRODUCTS_LIST;

    fixture.detectChanges();

    expect(component.filteredFavoriteProductsList).toEqual(ADD_ONE_FAV_PRODUCTS_LIST);
    expect(component.originalFavoriteProductsList).toEqual(ADD_ONE_FAV_PRODUCTS_LIST);
  })


  it('setNameFilter --> when call setNameFilter because the input data changes', () => {
    component.favoriteProductsList = DEFAULT_FAV_PRODUCTS_LIST;
    fixture.detectChanges();

    component.setNameFilter('iPhone');

    expect(component.filteredFavoriteProductsList).toEqual(FILTERED_FAV_PRODUCTS_LIST);
  })

  it('setNameFilter --> when call setNameFilter because the input data changes to null', () => {
    component.favoriteProductsList = DEFAULT_FAV_PRODUCTS_LIST;
    component.filteredFavoriteProductsList = FILTERED_FAV_PRODUCTS_LIST;

    fixture.detectChanges();
    component.setNameFilter('');

    expect(component.filteredFavoriteProductsList).toEqual(DEFAULT_FAV_PRODUCTS_LIST);
  })


  it('onClickOpenModal --> when call onClickOpenModal, should set showModal to true', () => {
    component.onClickOpenModal()

    expect(component.showModal).toBeTrue()
  })

  it('onCloseModal --> when call onCloseModal, should set showModal to false', () => {
    component.onCloseModal()

    expect(component.showModal).toBeFalse()
  })


  it('onClickToDeleteFromFavorites --> when call onClickToDeleteFromFavorites, should emit the index to delete from favorite list', () => {
    spyOn(component.onDeleteFromFavorites, 'emit');
    let indexToDeleteFromFavorites: number = 1;

    component.onClickToDeleteFromFavorites(indexToDeleteFromFavorites);

    expect(component.onDeleteFromFavorites.emit).toHaveBeenCalledWith(indexToDeleteFromFavorites);
  })
});
