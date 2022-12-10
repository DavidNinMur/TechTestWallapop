import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product/product.service';

import { AllProductsResponse, ProductBackend } from "./models/productBackend";

@Component({
  selector: 'Home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'wallaTechTest';

  optionsDropdownSearchFilter: string[] = ['Nombre', 'Descripcion', 'Precio', 'Email'];
  defaultStringDropdownFilter: string = 'Select a filter';
  defaultPhraseErrorForPopUp: string = 'We don’t find any result with your search. Please search again with another criteria'

  selectedFruit: string = '';

  showPopUpNoResult: boolean = false;

  productsData: ProductBackend[] = [];

  constructor(private productService: ProductService) { }

  changeFruit(fruit: string) {
    this.selectedFruit = fruit;
  }

  async ngOnInit(): Promise<void> {
    this.productService.getProducts().subscribe(
      (result: AllProductsResponse) => {
        this.productsData = result.items
      }
    )
  }
}
