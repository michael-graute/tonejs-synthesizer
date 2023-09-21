import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { OscillatorComponent } from './oscillator/oscillator.component';
import {FormsModule} from "@angular/forms";
import { EnvelopeComponent } from './envelope/envelope.component';
import { SequenzerComponent } from './sequenzer/sequenzer.component';
import { MidiMonitorComponent } from './midi-monitor/midi-monitor.component';
import { KnobDirective } from './knob.directive';
import { KnobInputComponent } from './knob-input/knob-input.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    OscillatorComponent,
    EnvelopeComponent,
    SequenzerComponent,
    MidiMonitorComponent,
    KnobDirective,
    KnobInputComponent
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
