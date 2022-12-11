import { Component, Input, Output, EventEmitter } from '@angular/core';

import ProductFrontend from "src/app/models/productFrontEnd";

@Component({
  selector: 'productView',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {

  @Input() productList: ProductFrontend[] = [];
  @Output() onSetFavorite: EventEmitter<number> = new EventEmitter<number>();

  onClickFavorite(indexOfProductFavClicked: number) {
    this.onSetFavorite.emit(indexOfProductFavClicked);
  }
}
