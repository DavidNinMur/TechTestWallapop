import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Dropdown from 'src/app/models/dropDown';

@Component({
  selector: 'Dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() Options: Dropdown[] = [];
  @Input() DefaultPhrase: string = '';
  @Output() onChangeValueDropdown: EventEmitter<string> = new EventEmitter<string>();

  showDropdown: boolean = false;
  selectedItem: string = '';

  iconArrowUp = faArrowUp;
  iconArrowDown = faArrowDown;

  onClickDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onSelectOption(optionSelected: Dropdown) {
    this.selectedItem = optionSelected.label;
    this.onChangeValueDropdown.emit(optionSelected.value);
    this.onClickDropdown();
  }
}
