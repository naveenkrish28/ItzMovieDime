import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  fg: FormGroup;
  oldPassMatch = true;
  passMatch = true;
  constructor(private fb: FormBuilder, private login: LoginService, private router: Router) { }

  ngOnInit() {
    this.fg = this.fb.group({
      'oldpwd': ['', Validators.required],
      'newpwd': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      'cnfnewpwd': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    })
  }
  onSubmit(formGroup: FormGroup) {
    this.login.getOldPassword().subscribe((res: { email: string; password: string }) => {
      if (formGroup.get('oldpwd').value == res.password) {
        if (formGroup.get('cnfnewpwd').value == formGroup.get('newpwd').value) {
          this.login.changePass(formGroup.get('newpwd').value).subscribe(() => {
            alert("Password Changed");
            this.login.isLoggedIn = false;
            this.login.isAdmin = false;
            localStorage.removeItem("email");
            localStorage.removeItem("key");
            if (localStorage.getItem("admin")) {
              localStorage.removeItem("admin");
            }
            this.router.navigate(['home/login']);
          },
            () => {
              alert("some Error! Please try after sometime")
            });
        } else {
          this.passMatch = false;
          setTimeout(() => {
            this.passMatch = true;
          }, 3000)
        }
      } else {
        this.oldPassMatch = false;
        setTimeout(() => {
          this.oldPassMatch = true;
        }, 3000)
      }
    },
      () => {
        alert("some Error! Please try after sometime")
      })
  }
  onReset(formGroup: FormGroup) {
    formGroup.reset();
  }
}