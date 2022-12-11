import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product/product.service';

import { AllProductsResponse, ProductBackend } from "./models/productBackend";
import SearchEngine from './models/searchEngine';
import Dropdown from './models/dropDown';

@Component({
  selector: 'Home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'wallaTechTest';

  optionsDropdownSort: Dropdown[] = [
    { label: 'Name ( A > Z )', value: 'name-az' },
    { label: 'Name ( Z < A )', value: 'name-za' },
    { label: 'Description', value: 'description' },
    { label: 'Price Asc', value: 'price-asc' },
    { label: 'Price Desc', value: 'price-desc' },
    { label: 'Email', value: 'email' }
  ]
  defaultStringDropdownSort: string = 'Select a Sort';
  selectedSortValue: string = '';

  showPopUpNoResult: boolean = false;
  defaultPhraseErrorForPopUp: string = 'We don’t find any result with your search. Please search again with another criteria';

  originalProductsData: ProductBackend[] = [];
  filteredProductsData: ProductBackend[] = [];

  showProductList: boolean = false;

  constructor(private productService: ProductService) { }



  async ngOnInit(): Promise<void> {
    this.productService.getProducts().subscribe(
      (result: AllProductsResponse) => {
        this.originalProductsData = result.items
        this.filteredProductsData = result.items
      }
    )
  }


  sortFilteredProducts(filteredProductsData: ProductBackend[]) {
    let newFilteredProductsData: ProductBackend[] = filteredProductsData;
    switch (this.selectedSortValue) {
      case 'name-az':
        newFilteredProductsData.sort((a, b) => a.title.localeCompare(b.title))
        break;
      case 'name-za':
        newFilteredProductsData.sort((a, b) => b.title.localeCompare(a.title))
        break;
      case 'description':
        newFilteredProductsData.sort((a, b) => a.description.localeCompare(b.description))
        break;
      case 'price-asc':
        newFilteredProductsData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        newFilteredProductsData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'email':
        newFilteredProductsData.sort((a, b) => a.email.localeCompare(b.email))
        break;
    }
    this.filteredProductsData = newFilteredProductsData;
  }

  onButtonSearchClicked(newSearchFilter: any) {
    const keysFromSearchObj = Object.keys(newSearchFilter);
    let newFilteredProductsData: ProductBackend[] = this.originalProductsData;

    keysFromSearchObj.forEach((objKey) => {
      if (objKey === 'productName') {
        newFilteredProductsData = newFilteredProductsData.filter((productObj: any) => productObj.title.indexOf(newSearchFilter[objKey]) >= 0)
      } else if (objKey === 'productDescription') {
        newFilteredProductsData = newFilteredProductsData.filter((productObj: any) => productObj.description.indexOf(newSearchFilter[objKey]) >= 0)
      } else if (objKey === 'productMinPrice') {
        newFilteredProductsData = newFilteredProductsData.filter((productObj: any) => productObj.price >= newSearchFilter[objKey])
      } else if (objKey === 'productMaxPrice') {
        newFilteredProductsData = newFilteredProductsData.filter((productObj: any) => productObj.price <= newSearchFilter[objKey])
      } else if (objKey === 'productEmail') {
        newFilteredProductsData = newFilteredProductsData.filter((productObj: any) => productObj.email.indexOf(newSearchFilter[objKey]) >= 0)
      }
    })

    if (newFilteredProductsData.length <= 0) {
      this.showPopUpNoResult = true;
    } else {
      this.showProductList = true;
    }

    if (this.selectedSortValue !== '') {
      this.sortFilteredProducts(newFilteredProductsData);
    } else {
      this.filteredProductsData = newFilteredProductsData;
    }
  }

  onChangeValueDropdown(newSortSelected: string) {
    this.selectedSortValue = newSortSelected;
    this.sortFilteredProducts(this.filteredProductsData);
  }
}
