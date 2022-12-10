import { Component } from '@angular/core';
import { faStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'productItem',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  iconStar = faStar;

}
