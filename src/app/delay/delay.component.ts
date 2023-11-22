import {Component, Input} from '@angular/core';
import * as Tone from "tone";

@Component({
  selector: 'ins-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent {
 @Input() delay: Tone.FeedbackDelay = new Tone.FeedbackDelay();

 public delayTime: number = 0.25;
 public feedback: number = 0.5;


 setDelayTime(value: number) {
   this.delayTime = value;
   this.delay.delayTime.value = value;
 }

}
