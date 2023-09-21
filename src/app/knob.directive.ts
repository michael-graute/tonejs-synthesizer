import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[insKnob]'
})
export class KnobDirective {

  mousedown = false;
  startScreenY = 0;

  private knob_being_dragged = null;
  private knob_drag_previous_angle = null;
  private knob_drag_previous_value = null;
  private knob_drag_initial_value = null;

  constructor(private el: ElementRef) {

  }

  @HostListener('mousedown', ['$event']) onMouseEnter(event: MouseEvent) {
    this.mousedown = true;
    this.startScreenY = event.screenY;
  }

  @HostListener('document:mouseup') onMouseUp() {
    this.mousedown = false;
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.mousedown) {
      console.log(this.startScreenY - event.screenY);
      this.el.nativeElement.value = this.startScreenY - event.screenY;
    }
  }

  highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
