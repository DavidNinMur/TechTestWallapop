import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product/product.service';

import { AllProductsResponse, ProductBackend } from "./models/productBackend";
import SearchEngine from './models/searchEngine';

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

  originalProductsData: ProductBackend[] = [];
  filteredProductsData: ProductBackend[] = [];

  showProductList: boolean = false;

  constructor(private productService: ProductService) { }

  changeFruit(fruit: string) {
    this.selectedFruit = fruit;
  }

  async ngOnInit(): Promise<void> {
    this.productService.getProducts().subscribe(
      (result: AllProductsResponse) => {
        this.originalProductsData = result.items
        this.filteredProductsData = result.items
        console.log('this.originalProductsData :>> ', this.originalProductsData);
      }
    )
  }


  onButtonSearchClicked(newSearchFilter: any) {
    const keysFromSearchObj = Object.keys(newSearchFilter);
    let newFilteredProductsData: ProductBackend[] = this.originalProductsData;

    keysFromSearchObj.forEach((objKey) => {
      if (objKey === 'productName') {
        newFilteredProductsData = this.originalProductsData.filter((productObj: any) => productObj.title.indexOf(newSearchFilter[objKey]) >= 0)
      } else if (objKey === 'productDescription') {
        newFilteredProductsData = this.originalProductsData.filter((productObj: any) => productObj.description.indexOf(newSearchFilter[objKey]) >= 0)
      } else if (objKey === 'productMinPrice') {
        newFilteredProductsData = this.originalProductsData.filter((productObj: any) => productObj.price >= newSearchFilter[objKey])
      } else if (objKey === 'productMaxPrice') {
        newFilteredProductsData = this.originalProductsData.filter((productObj: any) => productObj.price <= newSearchFilter[objKey])
      } else if (objKey === 'productEmail') {
        newFilteredProductsData = this.originalProductsData.filter((productObj: any) => productObj.email.indexOf(newSearchFilter[objKey]) >= 0)
      }
    })

    this.showProductList = true;
    if (newFilteredProductsData.length <= 0) {
      this.showPopUpNoResult = true;
    }

    this.filteredProductsData = newFilteredProductsData;
  }
}
