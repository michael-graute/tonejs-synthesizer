import {Component, Input} from '@angular/core';
import * as Tone from "tone";

@Component({
  selector: 'ins-chorus',
  templateUrl: './chorus.component.html',
  styleUrls: ['./chorus.component.scss']
})
export class ChorusComponent {
  @Input() chorus: Tone.Chorus = new Tone.Chorus();
}
