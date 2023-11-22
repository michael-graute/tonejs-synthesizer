import {Component, Input} from '@angular/core';
import * as Tone from "tone";

@Component({
  selector: 'ins-reverb',
  templateUrl: './reverb.component.html',
  styleUrls: ['./reverb.component.scss']
})
export class ReverbComponent {

  @Input() reverb: Tone.Reverb = new Tone.Reverb();

}
