import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product/product.service';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { AllProductsResponse, ProductBackend } from "./models/productBackend";
import Dropdown from './models/dropDown';

@Component({
  selector: 'Home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wallaTechTest';

  iconArrowUp = faArrowUp;

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
  originalFilteredProductsData: ProductBackend[] = [];

  showProductList: boolean = false;
  showScrollToTheTopButton: boolean = false;

  activePagination: boolean = false;

  paginationHeight: number;
  paginationScrollHeight: number;
  elementsRenderedInView: number = 5;

  constructor(private productService: ProductService) { }

  ngDoCheck() {
    if (this.activePagination) {
      this.paginationHeight = document.documentElement.offsetHeight - document.documentElement.clientHeight
    }
  }

  async ngOnInit(): Promise<void> {
    this.productService.getProducts().subscribe(
      (result: AllProductsResponse) => {
        this.originalProductsData = result.items
        this.filteredProductsData = result.items
      }
    )
  }

  doSomethingOnScroll($event: Event) {
    if (document.documentElement.scrollTop == this.paginationHeight && this.activePagination) {
      this.elementsRenderedInView = this.elementsRenderedInView + 5;
      this.setNewFilteredProductsData(this.originalFilteredProductsData);
    }
    if (document.documentElement.scrollTop > 100 && !this.showScrollToTheTopButton) {
      this.showScrollToTheTopButton = true;
    } else if (document.documentElement.scrollTop < 100) {
      this.showScrollToTheTopButton = false;
    }
  }

  setNewFilteredProductsData(newFilteredProductsData: ProductBackend[]) {
    if (newFilteredProductsData.length > 5) {
      this.filteredProductsData = newFilteredProductsData.slice(0, this.elementsRenderedInView);
      setTimeout(() => {
        this.activePagination = true
      }, 1000);
    } else {
      this.filteredProductsData = newFilteredProductsData;
    }
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
    console.log('sortFilteredProducts :>> ', newFilteredProductsData);
    this.setNewFilteredProductsData(newFilteredProductsData);
  }

  onButtonSearchClicked(newSearchFilter: any) {
    const keysFromSearchObj = Object.keys(newSearchFilter);
    let newFilteredProductsData: ProductBackend[] = this.originalProductsData;
    this.elementsRenderedInView = 5;

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

    this.originalFilteredProductsData = newFilteredProductsData;
    if (this.selectedSortValue !== '') {
      this.sortFilteredProducts(newFilteredProductsData);
    } else {
      this.setNewFilteredProductsData(newFilteredProductsData);
    }
  }

  onChangeValueDropdown(newSortSelected: string) {
    this.selectedSortValue = newSortSelected;
    this.sortFilteredProducts(this.originalFilteredProductsData);
  }

  onGoTopScroll() {
    document.documentElement.scrollTop = 0;
  }
}

