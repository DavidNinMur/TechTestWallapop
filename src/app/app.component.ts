import { Component } from '@angular/core';

@Component({
  selector: 'Home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wallaTechTest';

  optionsDropdownSearchFilter: string[] = ['Nombre', 'Descripcion', 'Precio', 'Email'];
  defaultStringDropdownFilter: string = 'Select a filter';
  defaultPhraseErrorForPopUp: string = 'We don’t find any result with your search. Please search again with another criteria'

  selectedFruit: string = '';

  showPopUpNoResult: boolean = false

  changeFruit(fruit: string) {
    this.selectedFruit = fruit;
  }

}
