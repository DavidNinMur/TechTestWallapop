import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { DropdownComponent } from './components/dropdown/dropdown.component';
import { InternalSearchComponent } from './components/internal-search/internal-search.component';
import { PopupErrorComponent } from './components/popup-error/popup-error.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    InternalSearchComponent,
    PopupErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxSliderModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
