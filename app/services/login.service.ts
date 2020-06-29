import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUserModel } from '../home/models/newuser.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = false;
  isAdmin = false;
  finalString: string = "";
  id: string;
  clickX=0; clickY = 0;
  constructor(private http: HttpClient) {
  }
  validateUser() {
    return this.http.get<{email: string,password: string}>("https://itzmoviedime.firebaseio.com/login_cred.json");
  }
  createNewUser( newUser: NewUserModel) {
    return this.http.post("http://localhost:8080/spring-mvc-demo/F", 
    newUser, {
      responseType: 'text',
    });
  }
  deleteUser() {
      this.finalString = "https://itzmoviedime.firebaseio.com/login_cred/$(localStorage.getItem('key'))" + ".json";
      return this.http.delete(this.finalString);
  }
  changePass(pass: string) {
    this.finalString = "https://itzmoviedime.firebaseio.com/login_cred/" + localStorage.getItem("key") + ".json";
    return this.http.patch(this.finalString, {
      "password": pass,
    });
  }
  getOldPassword(){
    this.finalString = "https://itzmoviedime.firebaseio.com/login_cred/" + localStorage.getItem("key") + ".json";
    return this.http.get(this.finalString);
  }
}
