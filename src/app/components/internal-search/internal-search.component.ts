import { Component, EventEmitter, Output } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";

import { diffObjs } from "../../services/compareObjs/compareObjs";

import SearchEngine from "../../models/searchEngine";

@Component({
  selector: 'InternalSearch',
  templateUrl: './internal-search.component.html',
  styleUrls: ['./internal-search.component.scss']
})

export class InternalSearchComponent {
  defaultSearchEngine: SearchEngine = { productName: '', productDescription: "", productMinPrice: 0, productMaxPrice: 2000, productEmail: "", };
  newSearchEngine: SearchEngine = { productName: '', productDescription: "", productMinPrice: 0, productMaxPrice: 2000, productEmail: "", };

  rangeSliderOptions: Options = {
    floor: 0,
    ceil: 2000
  };

  @Output() onButtonSearchClicked: EventEmitter<{}> = new EventEmitter<{}>();

  onSubmit() {
    const newFiltersToProductView = diffObjs(this.defaultSearchEngine, this.newSearchEngine)
    this.onButtonSearchClicked.emit(newFiltersToProductView);
  }

  onResetFilters() {
    this.newSearchEngine = { productName: '', productDescription: "", productMinPrice: 0, productMaxPrice: 2000, productEmail: "", };
    const newFiltersToProductView = diffObjs(this.defaultSearchEngine, this.newSearchEngine)
    this.onButtonSearchClicked.emit(newFiltersToProductView);
  }

}