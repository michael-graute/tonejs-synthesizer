import {Injectable, Output} from '@angular/core';
import * as Tone from "tone";
import {Subject} from "rxjs";

export interface Step {
  velocity: number;
  pitch: number;
  duration: string;
  playing?: boolean;
  armed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SynthService {

  sequenzerStepPlaying: Subject<number> = new Subject<number>();
  sequenzerStopped: Subject<void> = new Subject<void>();
  sequenzerStarted: Subject<void> = new Subject<void>();
  noteOn: Subject<string> = new Subject<string>();
  noteOff: Subject<string> = new Subject<string>();

  private reverb = new Tone.Reverb(5).toDestination();

  private delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();

  private _tempo: number = 120;

  private loop?: Tone.Loop;

  private synths: Tone.Synth[] = [];

  public sequencerEnabled: boolean = false;

  public sequenzerPlaying: boolean = false;

  public sequencerInterval: string = '8n';

  public sequencerRootNote: string = 'C4';

  public currentNote: string = 'C4';

  public sequencerActiveStepsCount: number = 8;

  public currentSequencerStep: number = 0;

  public sequencerSteps: Step[] = [
    {velocity: 1, pitch: 0, duration: '8n', armed: true},
    {velocity: 1, pitch: 3, duration: '8n', armed: true},
    {velocity: 1, pitch: 7, duration: '8n', armed: true},
    {velocity: 1, pitch: 3, duration: '8n', armed: true},
    {velocity: 1, pitch: 0, duration: '8n', armed: true},
    {velocity: 1, pitch: 3, duration: '8n', armed: true},
    {velocity: 1, pitch: 7, duration: '8n', armed: true},
    {velocity: 1, pitch: 3, duration: '8n', armed: true},
    {velocity: 1, pitch: 0, duration: '8n', armed: true},
    {velocity: 1, pitch: 3, duration: '8n', armed: true},
    {velocity: 1, pitch: 7, duration: '8n', armed: true},
    {velocity: 1, pitch: 3, duration: '8n', armed: true},
    {velocity: 1, pitch: 0, duration: '8n', armed: true},
    {velocity: 1, pitch: 3, duration: '8n', armed: true},
    {velocity: 1, pitch: 7, duration: '8n', armed: true},
    {velocity: 1, pitch: 3, duration: '8n', armed: true},
  ]

  constructor() {
  }


  set tempo(tempo: number) {
    this._tempo = tempo;
  }

  get tempo(): number {
    return this._tempo;
  }

  play(){
    this.noteOn.next(this.currentNote);
    this.synths.forEach((synth: Tone.Synth) => {
      synth.triggerAttack(this.currentNote);
    });
  }

  stop(){
    this.noteOff.next(this.currentNote);
    this.synths.forEach((synth: Tone.Synth) => {
      synth.triggerRelease();
    });
  }

  playSequence() {
    this.sequenzerPlaying = true;
    this.sequenzerStarted.next();
    let index = 0;
    this.loop = new Tone.Loop(time => {
      const step = this.sequencerSteps[index];
      if(step.armed) {
        const tone = Tone.Frequency(this.sequencerRootNote).transpose(step.pitch);
        this.synths.forEach((synth: Tone.Synth) => {
          synth.triggerAttackRelease(tone.toFrequency(), step.duration, time, step.velocity);
          this.noteOn.next(tone.toNote());
        });
      }
      Tone.Draw.schedule(() => {
        this.currentSequencerStep = index;
        this.sequenzerStepPlaying.next(index);
        index = (index + 1) % this.sequencerActiveStepsCount;
      }, time);
    }, this.sequencerInterval).start(0);
    Tone.Transport.bpm.value = this.tempo;
    Tone.Transport.start();
  }

  stopSequence() {
    this.noteOff.next(this.currentNote);
    this.sequenzerStopped.next();
    this.sequenzerPlaying = false;
    this.loop?.stop();
    Tone.Transport.stop();
    Tone.Transport.loopStart = 0;
  }

  addSynth(): Tone.Synth<Tone.SynthOptions> {
    const synth: Tone.Synth<Tone.SynthOptions> = new Tone.Synth().toDestination();
    this.synths.push(synth);
    return synth;
  }
}
