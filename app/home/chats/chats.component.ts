import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  chatEmail = "";
  email = "";

  constructor(private chat: ChatService, private router: Router) { }

  ngOnInit() {
  }
  chatWithEmail(){
    this.email = localStorage.getItem('email');
    this.email = this.email.replace("@","");
    this.email = this.email.replace('.','');

    this.chatEmail = this.chatEmail.replace("@","");
    this.chatEmail = this.chatEmail.replace('.','');
    this.chat.chatWithUser(this.email, this.chatEmail);
    this.router.navigate(["/home/chat"]);
  }
}
