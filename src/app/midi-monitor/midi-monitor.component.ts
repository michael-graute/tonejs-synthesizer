import {Component, Inject, OnInit} from '@angular/core';
import {MIDI_MESSAGES} from "@ng-web-apis/midi";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import * as Tone from "tone";
import {SynthService} from "../synth.service";

@Component({
  selector: 'ins-midi-monitor',
  templateUrl: './midi-monitor.component.html',
  styleUrls: ['./midi-monitor.component.scss']
})
export class MidiMonitorComponent implements OnInit{

  readonly notes$: Observable<[number, number, number]>;

  constructor(@Inject(MIDI_MESSAGES) messages$: Observable<MIDIMessageEvent>, public synthService: SynthService) {
    this.notes$ = messages$.pipe(
      map((message: MIDIMessageEvent) => [message.data[0], message.data[1], message.data[2]])
    );
  }

  ngOnInit(): void {
    this.notes$.subscribe((note: [number, number, number]): void => {
      console.log(note);
      if(note[0] === 144 && note[2] > 0) { // note on
        console.log('Note On', Tone.Frequency(note[1], "midi").toNote());
        console.log('Velocity', (1/127) * note[2]);
        this.synthService.currentNote = Tone.Frequency(note[1], "midi").toNote();
        this.synthService.play();
      } else if(note[0] === 144 && note[2] === 0) { // note off
        console.log('Note Off');
        this.synthService.stop();
      }
    });
  }
}
