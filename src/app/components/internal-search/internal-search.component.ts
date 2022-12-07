import { Component } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";

import SearchEngine from "../../models/searchEngine";

@Component({
  selector: 'InternalSearch',
  templateUrl: './internal-search.component.html',
  styleUrls: ['./internal-search.component.scss']
})

export class InternalSearchComponent {

  newSearchEngine: SearchEngine = { productName: '', productDescription: "", productMinPrice: 0, productMaxPrice: 2000, productEmail: "", }

  rangeSliderOptions: Options = {
    floor: 0,
    ceil: 2000
  };

  onSubmit() {
    console.log('newSearchEngine :>> ', this.newSearchEngine);
  }

  onResetFilters() {
    this.newSearchEngine = { productName: '', productDescription: "", productMinPrice: 0, productMaxPrice: 2000, productEmail: "", };
  }

}
