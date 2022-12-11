import { Component, Input } from '@angular/core';
import ProductFrontend from "src/app/models/productFrontEnd";

@Component({
  selector: 'productView',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {

  @Input() productList: ProductFrontend[] = [];

}
