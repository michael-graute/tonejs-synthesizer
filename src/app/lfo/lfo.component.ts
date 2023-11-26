import {Component, Input} from '@angular/core';
import * as Tone from "tone";

@Component({
  selector: 'ins-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss']
})
export class LfoComponent {
  @Input() lfo: Tone.LFO = new Tone.LFO();
}
