import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faStar, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { ProductItemComponent } from './product-item.component';

import { DEFAULT_PRODUCT_OBJ } from "./test-data/productItemTestData"

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [FontAwesomeModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.productDataObj = DEFAULT_PRODUCT_OBJ;
    fixture.detectChanges();
  });

  it('should create correct the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default values correctly', () => {
    expect(component.iconStar).toBe(faStar);
    expect(component.iconTrash).toBe(faTrashAlt);
  })

  it('onClickFavorite --> when call setNameFilter emit onSetFavorite', () => {
    spyOn(component.onSetFavorite, 'emit');

    component.onClickFavorite();

    expect(component.onSetFavorite.emit).toHaveBeenCalled()
  })

  it('onDeselectAsFavorite --> when call setNameFilter emit onDeselectFavorite', () => {
    spyOn(component.onDeselectFavorite, 'emit');

    component.onDeselectAsFavorite();

    expect(component.onDeselectFavorite.emit).toHaveBeenCalled()
  })
});
