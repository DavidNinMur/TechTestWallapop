import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewComponent } from './product-view.component';

describe('ProductViewComponent', () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductViewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClickFavorite --> when call onClickFavorite, should emit the index to add', () => {
    spyOn(component.onSetFavorite, 'emit');
    let indexToAddFromFavorites: number = 1;

    component.onClickFavorite(indexToAddFromFavorites);

    expect(component.onSetFavorite.emit).toHaveBeenCalledWith(indexToAddFromFavorites);
  })

  it('onDeselectAsFavorite --> when call onDeselectAsFavorite, should emit the index to delete', () => {
    spyOn(component.onDeselectFavorite, 'emit');
    let indexToDeleteFromFavorites: number = 1;

    component.onDeselectAsFavorite(indexToDeleteFromFavorites);

    expect(component.onDeselectFavorite.emit).toHaveBeenCalledWith(indexToDeleteFromFavorites);
  })
});
