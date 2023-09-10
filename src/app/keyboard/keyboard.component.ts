import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SynthService} from "../synth.service";

@Component({
  selector: 'ins-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  octaveBase : number = 0;
  public notes : string[] = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  public octaves : number[] = [];
  public msDwn : boolean = false;
  public heldNote: string = "";
  public lastNote : string = "";
  public currentNote : string = "";

  constructor(public synthService: SynthService, private changeDetectorRef: ChangeDetectorRef) {
    this.changeOctave(2)
  }

  play(note:string){
    this.synthService.currentNote = note;
    if(this.synthService.sequencerEnabled) {
      this.synthService.sequencerRootNote = note;
      this.synthService.playSequence();
    } else {
      this.synthService.play();
    }
  }

  stop(){
    if(this.synthService.sequencerEnabled) {
      this.synthService.sequencerRootNote = "C4";
      this.synthService.stopSequence();
    } else {
      this.synthService.stop();
    }
  }

  mouseDown(note:string, octave:number){
    this.msDwn = true;
    this.play(note + octave);
    this.lastNote = note + octave;
    this.heldNote = note + octave;
    this.currentNote = note + octave;
  }

  mouseUp(){
    this.msDwn = false;
    this.heldNote = "";
    this.lastNote = "";
    this.stop();
  }

  mouseOut(){
  }

  mouseOver(note:string, octave:number){
    if(this.msDwn) {
      if(this.synthService.sequencerEnabled && (note + octave) != this.lastNote) {
          this.synthService.currentNote = note + octave;
          this.synthService.sequencerRootNote = note + octave;
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

  ngOnInit(): void {
    this.synthService.noteOn.subscribe((note: string) => {
      this.currentNote = note;
      this.changeDetectorRef.detectChanges();
    });
  }
}
