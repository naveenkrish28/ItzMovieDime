import { Directive, HostListener } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Directive({
  selector: '[appEnterSubmit]'
})
export class EnterSubmitDirective {
  @HostListener('keypress',['$event'])
  keyDown(event: KeyboardEvent){
    if(event.keyCode == 13 && !event.shiftKey)
    {
       event.preventDefault();
       this.chat.chatSubject.next("someValue");
    }
  }
  constructor(private chat: ChatService) { }

}
