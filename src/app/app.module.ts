import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { AppComponent } from './app.component';

import { DropdownComponent } from './components/dropdown/dropdown.component';
import { InternalSearchComponent } from './components/internal-search/internal-search.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    InternalSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
