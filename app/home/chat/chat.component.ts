import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ChatService } from '../../services/chat.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: string [][] = [];
  sent: boolean[]=[];
  email: string;
  text: string;
  num: number[]=[];
  subs: Subscription;
  constructor(private afd: AngularFireDatabase,private http: HttpClient, 
    private snaclBar: MatSnackBar, private chat: ChatService) { }

  ngOnInit() {  
    this.subs = this.chat.chatSubject.subscribe(val =>{
      this.sendMessage();
    })
    // this.email = localStorage.getItem('email');
    // this.email = this.email.replace("@","");
    // this.email = this.email.replace('.','');
    // this.afd.object<{(key: string): {message:string, sent: boolean}}>('messages/' + this.email).valueChanges().subscribe(mes => {
    //   this.messages = [];
    //   for(let key in mes){
    //     console.log("read Split");
    //     let split = mes[key].message.split("\n");
    //     // if(this.num.length >0){
    //     //   this.num = [];
    //     // }
    //   for(let i=0;i<split.length;i++){
    //     this.num.push(i);
    //   }
    //     this.messages.push(split);
    //     this.sent.push(mes[key].sent);
    //   }
    // })
  }
  sendMessage(){
    if(this.text){
      // this.afd.list('messages/' + this.email).set("message",this.text).then(val => {
    // });
    // this.http.post('https://itzmoviedime.firebaseio.com/messages/' + this.email + '.json',{
    //   "message":this.text,
    //   "sent":true,
    // }).subscribe(val=>{
    // })
    this.http.post('https://itzmoviedime.firebaseio.com/messages/' + this.email + '.json',{
      "message":this.text,
      "sent":true,
    }).subscribe(val=>{
    })
    this.text = "";
    this.sent = [];
    this.messages = [];
    }else{
      this.snaclBar.open("Unable to send Empty Message", "OK", {
        duration: 3000,
      })
    }
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
