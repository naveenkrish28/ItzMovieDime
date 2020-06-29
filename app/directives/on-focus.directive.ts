import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[appOnFocus]'
})
export class OnFocusDirective {
  @Input() pColor: String;
  constructor(private el: ElementRef, private renderer: Renderer) { 
    this.pColor = "red";
  }
  @HostListener ('mouseenter') onFocusEnter() {
    $(this.el.nativeElement).css('color','red');
    $(this.el.nativeElement).addClass('pom')
    //this.renderer.setElementClass(this.el.nativeElement, 'scale', true)
  }
  @HostListener ('mouseleave') onFocusExit() {
    $(this.el.nativeElement).css('color','blanchedalmond');
    $(this.el.nativeElement).removeClass('pom')
    // this.renderer.setElementClass(this.el.nativeElement, 'scale', false)
  }
}
