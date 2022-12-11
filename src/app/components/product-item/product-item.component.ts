import { Component, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import ProductFrontend from "src/app/models/productFrontEnd";

@Component({
  selector: 'productItem',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  iconStar = faStar;

  @Input() productDataObj: ProductFrontend;
}
