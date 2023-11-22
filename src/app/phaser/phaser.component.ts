import {Component, Input} from '@angular/core';
import * as Tone from "tone";

@Component({
  selector: 'ins-phaser',
  templateUrl: './phaser.component.html',
  styleUrls: ['./phaser.component.scss']
})
export class PhaserComponent {
 @Input() phaser: Tone.Phaser = new Tone.Phaser();
}
