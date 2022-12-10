import { Component, Input } from '@angular/core';
import { ProductBackend } from 'src/app/models/productBackend';

@Component({
  selector: 'productView',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {

  @Input() productList: ProductBackend[] = [];

}
