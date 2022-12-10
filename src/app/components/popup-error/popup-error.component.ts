import { Component, Input } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'PopupError',
  templateUrl: './popup-error.component.html',
  styleUrls: ['./popup-error.component.scss']
})
export class PopupErrorComponent {
  @Input() DefaultPhraseError: string = '';

  iconCross = faCircleXmark;

}
