import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private login: LoginService){}

  ngOnInit(){
    if(localStorage.getItem("email")){
      this.login.isLoggedIn = true;
    }
    if(localStorage.getItem("Admin") == "true"){
      this.login.isAdmin = true;
    }
  }
  calcTime(time: number, AmPm: string){
    if(AmPm == "AM"){
      return time;
    }else{
      return time + 12;
    }
  }
  title = 'ItzMovieDime';
}
