import {Component, ElementRef, HostListener, Input} from '@angular/core';

@Component({
  selector: 'ins-knob-input',
  templateUrl: './knob-input.component.html',
  styleUrls: ['./knob-input.component.scss']
})
export class KnobInputComponent {

  @Input() snapping: boolean = false;
  @Input() snapping_granularity: number = 16;
  @Input() max_rotations: number = 0;
  @Input() min_rotations: number = 0;

  private cur_speed: number = 0;
  private cur_rotations: number = 0;


  private knob_being_dragged: null|Element = null;
  private knob_drag_previous_rad: null|number = null;
  private knob_drag_previous_rotations: null|number = 0;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.max_rotations = this.speed_to_rotations(16);
    this.min_rotations = this.speed_to_rotations(-16);
  }

  @HostListener('mousedown', ['$event']) start_dragging(e: MouseEvent) {
    this.knob_being_dragged = this.elementRef.nativeElement.getElementsByClassName('knob')[0];
    e.preventDefault();
    e.stopPropagation();

    this.knob_drag_previous_rad = this.get_mouse_angle(e, this.knob_being_dragged.getElementsByClassName('knob_center')[0] as HTMLElement);
    this.knob_drag_previous_rotations = this.cur_rotations;
  }

  @HostListener('document:mouseup') stop_dragging() {
    this.knob_drag_previous_rad = null;
    this.knob_drag_previous_rotations = null;
    this.knob_being_dragged = null;
  }

  @HostListener('document:mousemove', ['$event']) dragRotate(e: MouseEvent) {
    if (!this.knob_being_dragged) {
      return;
    }

    const rad = this.get_mouse_angle(e, this.knob_being_dragged.getElementsByClassName('knob_center')[0] as HTMLElement);
    const old = this.knob_drag_previous_rad;
    this.knob_drag_previous_rad = rad;

    let delta = rad - (old ?? 0);
    if (delta < 0) {
      // Because this is a circle
      delta += Math.PI * 2;
    }
    if (delta > Math.PI) {
      // Converting from 0..360 to -180..180.
      delta -= Math.PI * 2;
    }
    //console.log(delta >= -Math.PI && delta <= Math.PI, {delta: delta, rad: rad, old: old});

    // var rotation = rad / Math.PI / 2;

    const delta_rotation = delta / Math.PI / 2;
    const rotations = (this.knob_drag_previous_rotations ?? 0) + delta_rotation;
    this.knob_drag_previous_rotations = rotations;
    this.set_rotations(rotations);
  }

  private set_rotations(rotations: number) {
    if (this.snapping) {
      if (this.snapping_granularity >= 2) {
        rotations = Math.round(rotations * this.snapping_granularity) / this.snapping_granularity;
      }
    }

    if (this.max_rotations !== null && this.max_rotations !== undefined && rotations > this.max_rotations) {
      rotations = this.min_rotations;
    }
    if (this.min_rotations !== null && this.min_rotations !== undefined && rotations < this.min_rotations) {
      rotations = this.min_rotations;
    }

    this.cur_rotations = rotations;
    this.cur_speed = this.rotations_to_speed(rotations);

    if(this.knob_being_dragged) {
      const knobNumber = this.knob_being_dragged.getElementsByClassName('knob_number')[0] as HTMLElement;
      const knobGfx = this.knob_being_dragged.getElementsByClassName('knob_gfx')[0] as HTMLElement;

      knobNumber.textContent = this.format_number(this.cur_speed);
      knobGfx.style.transform = 'rotate(' + (this.cur_rotations * 360) + 'deg)';
    }
  }

  private format_number(number: number) {
    if (Math.round(Math.abs(number) * 10) >= 10 * 10) {
      return number.toFixed(0);
    } else {
      return number.toFixed(1);
    }
  }

  private get_mouse_angle(e: MouseEvent, knob_center: HTMLElement) {
    const rect = document.querySelector('.knob_center')?.getBoundingClientRect() ?? null;
    if(rect) {
      const center_x = rect.left + (rect.right - rect.left) / 2;
      const center_y = rect.top + (rect.bottom - rect.top) / 2
      const mouse_x = e.pageX;
      const mouse_y = e.pageY;
      //return Math.atan2(mouse_y - center_y, mouse_x - center_x);
      return (center_y-mouse_y) / 10;
    }
    return 0;
  }

  private speed_to_rotations(speed: number): number {
    const sign = speed < 0 ? -1 : 1;
    const abs = Math.abs(speed);

    if (abs < 2) {  // 0..2
      return speed;
    } else if (abs < 4) {  // 2..4
      return sign * ((abs - 2) / 2 + 2);
    } else {
      return sign * ((abs - 4) / 4 + 3);
    }
  }

  private rotations_to_speed(rotations: number): number {
    const sign = rotations < 0 ? -1 : 1;
    const abs = Math.abs(rotations);

    if (abs < 2) {  // 0..2
      return rotations;
    } else if (abs < 3) {  // 2..3
      return sign * ((abs - 2) * 2 + 2);
    } else {
      return sign * ((abs - 3) * 4 + 4);
    }
  }

}
