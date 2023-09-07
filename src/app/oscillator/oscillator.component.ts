import { Component } from '@angular/core';
import {SynthService} from "../synth.service";

@Component({
  selector: 'ins-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent {

  availableWaveForms = ['sine', 'square', 'sawtooth', 'triangle']
  selectedWaveForm: string = 'triangle';

  constructor(private synthService: SynthService) {
  }

  setWaveForm() {
    this.synthService.setOscillatorType(this.selectedWaveForm)
  }
}
