import {Component, Input} from '@angular/core';
import {SynthService} from "../synth.service";
import * as Tone from "tone";
import {OmniOscillatorType} from "tone/build/esm/source/oscillator/OscillatorInterface";

@Component({
  selector: 'ins-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent {

  @Input() synth: Tone.Synth = new Tone.Synth();
  @Input() name: string = 'Oscillator'

  availableWaveForms:OmniOscillatorType[] = ['sine', 'square', 'sawtooth', 'triangle']

  constructor() {
  }
}
