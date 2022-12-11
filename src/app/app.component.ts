import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product/product.service';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { AllProductsResponse, ProductBackend } from "./models/productBackend";
import ProductFrontend from "./models/productFrontEnd";

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

  originalProductsData: ProductFrontend[] = [];
  filteredProductsData: ProductFrontend[] = [];
  originalFilteredProductsData: ProductFrontend[] = [];

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
        result.items.forEach((itemObj: ProductBackend) => {
          let newProductData: ProductFrontend = {
            productName: itemObj.title,
            productDescription: itemObj.description,
            productPrice: itemObj.price,
            productEmail: itemObj.email,
            productImage: itemObj.image,
            productFav: false,
          }
          this.originalProductsData.push(newProductData);
          this.filteredProductsData.push(newProductData);
        })
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

  setNewFilteredProductsData(newFilteredProductsData: ProductFrontend[]) {
    if (newFilteredProductsData.length > 5) {
      this.filteredProductsData = newFilteredProductsData.slice(0, this.elementsRenderedInView);
      setTimeout(() => {
        this.activePagination = true
      }, 1000);
    } else {
      this.filteredProductsData = newFilteredProductsData;
    }
  }

  sortFilteredProducts(filteredProductsData: ProductFrontend[]) {
    let newFilteredProductsData: ProductFrontend[] = filteredProductsData;
    switch (this.selectedSortValue) {
      case 'name-az':
        newFilteredProductsData.sort((a, b) => a.productName.localeCompare(b.productName))
        break;
      case 'name-za':
        newFilteredProductsData.sort((a, b) => b.productName.localeCompare(a.productName))
        break;
      case 'description':
        newFilteredProductsData.sort((a, b) => a.productDescription.localeCompare(b.productDescription))
        break;
      case 'price-asc':
        newFilteredProductsData.sort((a, b) => parseFloat(a.productPrice) - parseFloat(b.productPrice));
        break;
      case 'price-desc':
        newFilteredProductsData.sort((a, b) => parseFloat(b.productPrice) - parseFloat(a.productPrice));
        break;
      case 'email':
        newFilteredProductsData.sort((a, b) => a.productEmail.localeCompare(b.productEmail))
        break;
    }
    console.log('sortFilteredProducts :>> ', newFilteredProductsData);
    this.setNewFilteredProductsData(newFilteredProductsData);
  }

  onButtonSearchClicked(newSearchFilter: any) {
    const keysFromSearchObj = Object.keys(newSearchFilter);
    let newFilteredProductsData: ProductFrontend[] = this.originalProductsData;
    this.elementsRenderedInView = 5;

    keysFromSearchObj.forEach((objKey) => {
      if (objKey === 'productName' || objKey === 'productDescription' || objKey === 'productEmail') {
        newFilteredProductsData = newFilteredProductsData.filter((productObj: ProductFrontend) => productObj[objKey].indexOf(newSearchFilter[objKey]) >= 0)
      } else if (objKey === 'productMinPrice') {
        newFilteredProductsData = newFilteredProductsData.filter((productObj: ProductFrontend) => productObj.productPrice >= newSearchFilter[objKey])
      } else if (objKey === 'productMaxPrice') {
        newFilteredProductsData = newFilteredProductsData.filter((productObj: ProductFrontend) => productObj.productPrice <= newSearchFilter[objKey])
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

  onClickFavorite(indexOfProductFavClicked: number) {
    let newFilteredProductsData: ProductFrontend[] = this.filteredProductsData;

    newFilteredProductsData[indexOfProductFavClicked].productFav = !newFilteredProductsData[indexOfProductFavClicked].productFav;

    this.setNewFilteredProductsData(newFilteredProductsData)
  }
}

