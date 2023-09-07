import { Component } from '@angular/core';
import {SynthService} from "../synth.service";

@Component({
  selector: 'ins-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  octaveBase : number = 0;
  public notes : string[] = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  public octaves : number[] = [];
  public msDwn : boolean = false;
  private lastNote : string = "";

  constructor(public synthService: SynthService) {
    this.changeOctave(2)
  }

  play(note:string){
    this.synthService.currentNote = note;
    if(this.synthService.sequencerEnabled) {
      this.synthService.playSequence();
    } else {
      this.synthService.play();
    }
  }

  stop(){
    if(this.synthService.sequencerEnabled) {
      this.synthService.stopSequence();
    } else {
      this.synthService.stop();
    }
  }

  mouseDown(note:string, octave:number){
    this.msDwn = true;
    this.play(note + octave);
    this.lastNote = note + octave;
  }

  mouseUp(){
    this.msDwn = false;
    this.stop();
  }

  mouseOut(){
  }

  mouseOver(note:string, octave:number){
    if(this.msDwn) {
      if(this.synthService.sequencerEnabled && (note + octave) != this.lastNote) {
          this.synthService.currentNote = note + octave;
      } else if(!this.synthService.sequencerEnabled) {
        this.play(note + octave);
      }
      this.lastNote = note + octave;
    }
  }

  changeOctave(octave:number){
    this.octaveBase = this.octaveBase + octave;
    this.octaves = [this.octaveBase + 1, this.octaveBase + 2, this.octaveBase + 3]
  }
}
