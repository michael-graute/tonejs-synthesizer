import { Component } from '@angular/core';
import {SynthService} from "../synth.service";

@Component({
  selector: 'ins-envelope',
  templateUrl: './envelope.component.html',
  styleUrls: ['./envelope.component.scss']
})
export class EnvelopeComponent {
  attack: number = 0.01;
  decay: number = 0.01;
  sustain: number = 0.1;
  release: number = 0.01;

  constructor(public synthService: SynthService) {
  }

  setAttack() {
    this.synthService.setAttack(this.attack);
  }

  setDecay() {
    this.synthService.setDecay(this.decay);
  }

  setSustain() {
    this.synthService.setSustain(this.sustain);
  }

  setRelease() {
    this.synthService.setRelease(this.release);
  }
}
