import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faStar, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import ProductFrontend from 'src/app/models/productFrontEnd';

@Component({
  selector: 'Modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() favoriteProductsList: ProductFrontend[] = [];
  @Output() onDeleteFromFavorites: EventEmitter<number> = new EventEmitter<number>();

  filteredFavoriteProductsList: ProductFrontend[] = []
  originalFavoriteProductsList: ProductFrontend[] = []

  iconStar = faStar;
  iconCross = faCircleXmark;

  nameSearched: string = '';

  showModal: boolean = false;
  enterInDoCheck: boolean = false;

  ngDoCheck() {
    if (this.filteredFavoriteProductsList.length <= 0 && !this.enterInDoCheck) {
      this.filteredFavoriteProductsList = this.favoriteProductsList
      this.enterInDoCheck = true;
    }
    if (JSON.stringify(this.originalFavoriteProductsList) !== JSON.stringify(this.favoriteProductsList)) {
      this.filteredFavoriteProductsList = this.favoriteProductsList;
      this.originalFavoriteProductsList = this.favoriteProductsList;
      this.setNameFilter(this.nameSearched)
    }
  }

  setNameFilter(nameFilter: string) {
    if (nameFilter != '') {
      this.filteredFavoriteProductsList = this.filteredFavoriteProductsList.filter((productObj: ProductFrontend) => productObj.productName.indexOf(nameFilter) >= 0)
    } else {
      this.filteredFavoriteProductsList = this.favoriteProductsList;
    }
  }

  onClickOpenModal() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
  }

  onClickToDeleteFromFavorites(indexToDeleteFromFavorites: number) {
    this.onDeleteFromFavorites.emit(indexToDeleteFromFavorites);
  }
}
