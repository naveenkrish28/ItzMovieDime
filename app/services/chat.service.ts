import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatSubject = new Subject();
  constructor(private http: HttpClient) {}
  chatWithUser(email: string , chatEmail: string){
    // this.http.post<{name:string}>('https://itzmoviedime.firebaseio.com/messages/' + email + '.json', {
    //   email: chatEmail
    // }).subscribe(val => {
    //  this.openChat(email, val.name, chatEmail);
    // });
  }
  openChat(email:string, key: string, chatEmail: string){
    let link = 'https://itzmoviedime.firebaseio.com/messages/' + email + '/' 
          + key +'/' + chatEmail + '.json';
  }
}
