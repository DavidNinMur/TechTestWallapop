import { Component } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";

@Component({
  selector: 'InternalSearch',
  templateUrl: './internal-search.component.html',
  styleUrls: ['./internal-search.component.scss']
})
export class InternalSearchComponent {


  value: number = 0;
  highValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000
  };

  onSubmit() {
    console.log('hola :>> ',);
  }

}
