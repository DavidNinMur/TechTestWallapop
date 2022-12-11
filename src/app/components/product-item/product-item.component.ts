import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faStar, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import ProductFrontend from "src/app/models/productFrontEnd";

@Component({
  selector: 'productItem',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  iconStar = faStar;
  iconTrash = faTrashAlt;

  @Input() productDataObj: ProductFrontend;
  @Input() showAsFavoriteView: boolean = false;

  @Output() onSetFavorite: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDeselectFavorite: EventEmitter<string> = new EventEmitter<string>();

  onClickFavorite() {
    this.onSetFavorite.emit();
  }

  onDeselectAsFavorite() {
    this.onDeselectFavorite.emit();
  }
}
