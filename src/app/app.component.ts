import {Component, Inject} from '@angular/core';
import {MIDI_SUPPORT} from '@ng-web-apis/midi';
import {SynthService} from "./synth.service";
import * as Tone from "tone";
@Component({
  selector: 'ins-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public oscillators: Tone.Synth<Tone.SynthOptions>[] = [];

  started = false;
  constructor(@Inject(MIDI_SUPPORT) readonly supported: boolean, private synthService: SynthService) {
    this.addOscillator();
    this.addOscillator();
    this.addOscillator();
  }

  start() {
    this.started = true;
  }

  addOscillator() {
    this.oscillators.push(this.synthService.addSynth());
  }
}
