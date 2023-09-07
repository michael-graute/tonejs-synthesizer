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
  sequenceStopped: Subject<void> = new Subject<void>();

  private synth = new Tone.Synth();
  private synth2 = new Tone.Synth();

  private reverb = new Tone.Reverb(5).toDestination();

  private delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();

  private _tempo: number = 120;

  private loop?: Tone.Loop;

  public sequencerEnabled: boolean = false;

  public sequenzerPlaying: boolean = false;

  public sequencerInterval: string = '8n';

  public currentNote: string = 'C4';

  public sequencerActiveStepsCount: number = 8;

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
    this.synth.connect(this.reverb);
    this.synth2.connect(this.delay);
  }


  set tempo(tempo: number) {
    this._tempo = tempo;
  }

  get tempo(): number {
    return this._tempo;
  }

  play(){
    this.synth.triggerAttack(this.currentNote);
    this.synth2.oscillator.type = 'square';
    this.synth2.triggerAttack(this.currentNote);
  }

  stop(){
    this.synth.triggerRelease();
    this.synth2.triggerRelease();
  }

  setOscillatorType(type:string){
    this.synth.oscillator.type = type as any;
  }

  setAttack(attack:number){
    this.synth.envelope.attack = attack;
  }

  setDecay(decay:number){
    this.synth.envelope.decay = decay;
  }

  setSustain(sustain:number){
    this.synth.envelope.sustain = sustain;
  }

  setRelease(release:number){
    this.synth.envelope.release = release;
  }

  playSequence() {
    this.sequenzerPlaying = true;
    let index = 0;
    this.loop = new Tone.Loop(time => {
      const step = this.sequencerSteps[index];
      if(step.armed) {
        const tone = Tone.Frequency(this.currentNote).transpose(step.pitch);
        this.synth.triggerAttackRelease(tone.toFrequency(), step.duration, time, step.velocity);
        this.synth2.triggerAttackRelease(tone.toFrequency(), step.duration, time, step.velocity);
      }
      Tone.Draw.schedule(() => {
        this.sequenzerStepPlaying.next(index);
        index = (index + 1) % this.sequencerActiveStepsCount;
      }, time);
    }, this.sequencerInterval).start(0);
    Tone.Transport.bpm.value = this.tempo;
    Tone.Transport.start();
  }

  stopSequence() {
    this.sequenzerPlaying = false;
    this.sequenceStopped.next();
    this.loop?.stop();
    Tone.Transport.stop();
    Tone.Transport.loopStart = 0;
  }
}
