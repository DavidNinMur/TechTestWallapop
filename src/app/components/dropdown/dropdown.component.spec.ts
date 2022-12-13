import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { DropdownComponent } from './dropdown.component';

import Dropdown from 'src/app/models/dropDown';


describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      imports: [FontAwesomeModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create correct the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default values correctly', () => {
    expect(component.showDropdown).toBeFalse();
    expect(component.selectedItem).toBe('');
    expect(component.iconArrowUp).toBe(faArrowUp);
    expect(component.iconArrowDown).toBe(faArrowDown);
  })

  it('showDropdown --> should change showDropdown when call onClickDropdown', () => {
    expect(component.showDropdown).toBeFalse();
    component.onClickDropdown()
    expect(component.showDropdown).toBeTrue();
  })

  it('showDropdown --> should change showDropdown when call onClickDropdown twice', () => {
    expect(component.showDropdown).toBeFalse();
    component.onClickDropdown()
    expect(component.showDropdown).toBeTrue();
    component.onClickDropdown()
    expect(component.showDropdown).toBeFalse();
  })

  it('onSelectOption --> when call onSelectOption, should call the output function and set new selectedItem', () => {
    spyOn(component.onChangeValueDropdown, 'emit');
    let newOptionSelected: Dropdown = { label: 'Name', value: 'name' };
    let expectSelectItemData: string = 'Name';
    let expectEmitData: string = 'name';
    component.showDropdown = true;

    expect(component.selectedItem).toBe('');

    component.onSelectOption(newOptionSelected);

    expect(component.selectedItem).toBe(expectSelectItemData);
    expect(component.onChangeValueDropdown.emit).toHaveBeenCalledWith(expectEmitData)
    expect(component.showDropdown).toBeFalse();
  })

  it('onClickDropdown --> when i click onClickDropdown', fakeAsync(() => {
    spyOn(component, 'onClickDropdown');

    let button = fixture.debugElement.nativeElement.querySelector('#toogleDiv');
    button.click();

    tick();
    expect(component.onClickDropdown).toHaveBeenCalled();
  }))
});
