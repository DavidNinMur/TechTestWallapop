import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wallaTechTest';

  optionsDropdownSearchFilter: string[] = ['Nombre', 'Descripcion', 'Precio', 'Email'];
  defaultStringDropdownFilter: string = 'Select a filter';

  selectedFruit: string = '';

  changeFruit(fruit: string) {
    this.selectedFruit = fruit;
  }

}
