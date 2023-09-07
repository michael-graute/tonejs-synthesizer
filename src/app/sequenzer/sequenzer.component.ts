import {ChangeDetectorRef, Component} from '@angular/core';
import {Step, SynthService} from "../synth.service";

@Component({
  selector: 'ins-sequenzer',
  templateUrl: './sequenzer.component.html',
  styleUrls: ['./sequenzer.component.scss']
})
export class SequenzerComponent {

  stepCount: number = 0;

  constructor(public synthService: SynthService, private changeDetectorRef: ChangeDetectorRef) {
  }

  isPlaying: boolean = false;

  ngOnInit() {
    this.stepCount = this.synthService.sequencerSteps.length;
    this.synthService.sequenzerStepPlaying.subscribe((stepIndex: number) => {
      this.isPlaying = true;
      let step: Step = this.synthService.sequencerSteps[stepIndex];
      step.playing= true;
      let previousStep: Step = this.synthService.sequencerSteps[0];
      if(stepIndex > 0){
        previousStep = this.synthService.sequencerSteps[stepIndex-1];
      } else if (stepIndex == 0) {
        previousStep = this.synthService.sequencerSteps[this.synthService.sequencerActiveStepsCount-1];
      }
      previousStep.playing = false;
      this.changeDetectorRef.detectChanges();
    });
    this.synthService.sequenceStopped.subscribe(() => {
      this.isPlaying = false;
      this.synthService.sequencerSteps.forEach((step: Step) => {
        step.playing = false;
      });
      this.changeDetectorRef.detectChanges();
    });
  }

  play() {
    this.synthService.currentNote = 'C4';
    this.synthService.playSequence();
  }

  stop() {
    this.synthService.stopSequence();
  }

  toggleArmed(stepIndex: number) {
    this.synthService.sequencerSteps[stepIndex].armed = !this.synthService.sequencerSteps[stepIndex].armed;
  }

  setStepCount() {
    if (this.stepCount > this.synthService.sequencerSteps.length) {
      for (let i = this.synthService.sequencerSteps.length; i < this.stepCount; i++) {
        this.synthService.sequencerSteps.push({velocity: 1, pitch: 0, duration: '8n', armed: true});
      }
    } else if (this.stepCount < this.synthService.sequencerSteps.length) {
      this.synthService.sequencerSteps.splice(this.stepCount, this.synthService.sequencerSteps.length - this.stepCount);
    }
  }
}
