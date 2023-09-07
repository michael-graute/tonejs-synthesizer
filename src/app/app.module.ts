import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { OscillatorComponent } from './oscillator/oscillator.component';
import {FormsModule} from "@angular/forms";
import { EnvelopeComponent } from './envelope/envelope.component';
import { SequenzerComponent } from './sequenzer/sequenzer.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    OscillatorComponent,
    EnvelopeComponent,
    SequenzerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
