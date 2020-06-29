import { Component, OnInit, Injector, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import { LoginService } from '../../services/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocialLoginService, Provider, SocialUser } from 'ng8-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // animations: [
  //   trigger('anim', [
  //     state('state1', style({
  //       'transform': 'scale(1.5)'
  //     })),
  //     transition('state1 <=> *', animate(400))
  //   ])
  // ]
})
export class LoginComponent implements OnInit {
  fg: FormGroup;
  state = 'state1';
  emailAvail = false;
  validPass = false;
  user: SocialUser;

  constructor(private fb: FormBuilder, private login: LoginService, private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fg = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    });
  }
  onSubmit(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.login.validateUser()
        .subscribe(
          res => {
            for (const key in res) {
              if (formGroup.get('email').value == res[key].email) {
                this.emailAvail = true;
                if (formGroup.get('password').value == res[key].password) {
                  this.validPass = true;
                  this.login.isLoggedIn = true;
                  localStorage.setItem("email", res[key].email);
                  localStorage.setItem("key", key);
                  if (res[key].email == "naveen@firebase.com") {
                    localStorage.setItem("Admin", "true");
                    this.login.isAdmin = true;
                  }
                  this.router.navigate(['/home/movies']);
                }
              }
            }
          },
          () => {
          },
          () => {
            if (!this.emailAvail) {
              this.snackBar.open("Email Not Registered", "OK", {
                duration: 3000,
              });
            } else {
              if (!this.validPass) {
                this.snackBar.open("Incorrect Password", "OK", {
                  duration: 3000,
                });
                this.emailAvail = false;
              }
            }
          })
    }
  }
  onReset(formGroup: FormGroup) {
    formGroup.reset();
  }
  // loginWithFacebook(): void {
  //   this.socialLogin.login(Provider.FACEBOOK).subscribe(user => {
  //     this.user = user;
  //   },
  //     () => {

  //     },
  //     () => {
  //       const routerService = this.injector.get(Router);
  //       const ngZone = this.injector.get(NgZone);
  //       ngZone.run(() => {
  //         routerService.navigate(['home/movies'], { skipLocationChange: false });
  //       });
  //     });
  // }
  // loginWithGoogle(): void {
  //   this.socialLogin.login(Provider.GOOGLE).subscribe(user => {
  //     this.user = user;
  //   },
  //     () => {

  //     },
  //     () => {
  //       const routerService = this.injector.get(Router);
  //       const ngZone = this.injector.get(NgZone);
  //       ngZone.run(() => {
  //         routerService.navigate(['home/movies'], { skipLocationChange: false });
  //       });
  //     });
  // }
} 