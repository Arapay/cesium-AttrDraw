import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CesiumComponent } from './cesium/cesium.component';

import { FormsModule } from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {ButtonModule} from 'primeng/button';
import { AsideComponent } from './aside/aside.component';   
import {SliderModule} from 'primeng/slider';  
import {CheckboxModule} from 'primeng/checkbox';       //api
import {ColorPickerModule} from 'primeng/colorpicker';

import {SendDataService} from './service/send-data.service'


@NgModule({
  declarations: [
    AppComponent,
    CesiumComponent,
    AsideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    ButtonModule,
    SliderModule,
    CheckboxModule,
    ColorPickerModule
    
  ],
  providers: [
    SendDataService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    window['CESIUM_BASE_URL'] = './assets/cesium';
  }
}
