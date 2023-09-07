import {Component, Inject, OnInit} from '@angular/core';
import {MIDI_MESSAGES} from "@ng-web-apis/midi";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';

@Component({
  selector: 'ins-midi-monitor',
  templateUrl: './midi-monitor.component.html',
  styleUrls: ['./midi-monitor.component.scss']
})
export class MidiMonitorComponent implements OnInit{

  readonly notes$: Observable<[number, number, number]>;

  constructor(@Inject(MIDI_MESSAGES) messages$: Observable<MIDIMessageEvent>) {
    this.notes$ = messages$.pipe(
      map((message: MIDIMessageEvent) => [message.data[0], message.data[1], message.data[2]])
    );
  }

  ngOnInit(): void {
    this.notes$.subscribe((note: [number, number, number]): void => {
      console.log(note);
    });
  }
}
