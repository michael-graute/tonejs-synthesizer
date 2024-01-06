import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Step, SynthService} from "../synth.service";

@Component({
  selector: 'ins-sequenzer',
  templateUrl: './sequenzer.component.html',
  styleUrls: ['./sequenzer.component.scss']
})
export class SequenzerComponent implements OnInit {
  rootNotes: string[] = [];

  constructor(public synthService: SynthService, private changeDetectorRef: ChangeDetectorRef) {
    for(let i=0; i<6; i++) {
      ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B', 'B#'].forEach((note: string) => {
        this.rootNotes.push(note + i);
      });
    }
  }

  isPlaying: boolean = false;

  stepPlaying: number = 0;

  ngOnInit() {
    this.synthService.sequenzerStepPlaying.subscribe((stepIndex: number) => {
      this.stepPlaying = stepIndex;
      this.changeDetectorRef.detectChanges();
    });

    this.synthService.sequenzerStarted.subscribe(() => {
      this.isPlaying = true;
      this.stepPlaying = 0;
    });

    this.synthService.sequenzerStopped.subscribe(() => {
      this.isPlaying = false;
      this.stepPlaying = 0;
    });
  }

  play() {
    this.isPlaying = true;
    this.synthService.playSequence();
  }

  stop() {
    this.isPlaying = false;
    this.stepPlaying = 0;
    this.changeDetectorRef.detectChanges();
    this.synthService.stopSequence();
  }

  toggleArmed(stepIndex: number) {
    this.synthService.sequencerSteps[stepIndex].armed = !this.synthService.sequencerSteps[stepIndex].armed;
  }
}
