import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, ActivatedRoute, Params } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { NewUserModel } from "../models/newuser.model";
import { HttpErrorResponse } from '@angular/common/http';
import { CanDeacInterface } from '../guards/deac.guard';
import { Observable, fromEvent, of, interval } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

import * as $ from 'jquery';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit, CanDeacInterface {
  fg: FormGroup
  submitted = false;
  newUser: NewUserModel = { 'email': '', 'password': '' };
  passMatch = true;
  emailExists = false;
  emailExistsTemp = false;

  constructor(private fb: FormBuilder, private router:
    Router, private login: LoginService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fg = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      'confirmpass': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    })
    $('button').eq(2).dblclick(function(){
      $('button').eq(1).slideToggle();
    })
    // $(document).click(function(){
    //   $(".contain").slideToggle();
    // })
  }
  onCreateNewUser() {
    if (this.fg.valid) {
      if ((this.fg.get('password').value === this.fg.get('confirmpass').value)) {
        this.submitted = true;
        this.newUser.email = this.fg.get('email').value;
        this.newUser.password = this.fg.get('password').value;
        this.login.createNewUser(this.newUser)
          .subscribe((message) => {
            console.log(message);
            this.router.navigate(['home/login']);
          }, (error: HttpErrorResponse) => {
            this.submitted = false;
            if (error.status == 313) {
              console.log(error);
            }
          },
            () => {
              this.submitted = false;
            });
      } else {
        this.passMatch = false;
        setTimeout(() => { this.passMatch = true; }, 3000);
      }
    }
  }
  onReset() {
    this.fg.reset();
    console.log("In Reset");
    this.submitted = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.fg.touched && this.fg.dirty && !this.submitted) {
      return confirm("Unsaved Changes! Continue?");
    } else {
      return true;
    }
  }
  addBootstrapClass(){
    $('button').eq(0).toggleClass("btn btn-primary");
  }
}