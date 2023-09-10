import {Component, Input} from '@angular/core';
import {SynthService} from "../synth.service";
import * as Tone from "tone";

@Component({
  selector: 'ins-envelope',
  templateUrl: './envelope.component.html',
  styleUrls: ['./envelope.component.scss']
})
export class EnvelopeComponent {

  @Input() synth: Tone.Synth = new Tone.Synth();

  constructor(public synthService: SynthService) {
    /*this.synth.envelope.attack = 0.01;
    this.synth.envelope.decay = 0.01;
    this.synth.envelope.sustain = 0.8;
    this.synth.envelope.release = 0.01;*/
  }
}
