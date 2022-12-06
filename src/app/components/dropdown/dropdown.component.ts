import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'Dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() Options: string[] = [];
  @Input() DefaultPhrase: string = '';
  @Output() OnChange: EventEmitter<string> = new EventEmitter<string>();

  showDropdown: boolean = false;
  SelectedItem: string = '';

  iconArrowUp = faArrowUp;
  iconArrowDown = faArrowDown;

  toggle() {
    this.showDropdown = !this.showDropdown;
  }

  select(item: string) {
    this.SelectedItem = item;
    this.OnChange.emit(this.SelectedItem);
    this.toggle();
  }
}
