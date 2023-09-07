import {Component, Inject} from '@angular/core';
import {MIDI_SUPPORT} from '@ng-web-apis/midi';
@Component({
  selector: 'ins-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  started = false;
  constructor(@Inject(MIDI_SUPPORT) readonly supported: boolean) {
  }

  start() {
    this.started = true;
  }
}
