import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../home/material.module";

import {NgxSocialLoginModule } from 'ng8-social-login'

import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { MovieslistComponent } from './movieslist/movieslist.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OnFocusDirective } from '../directives/on-focus.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './Login-Interceptor';
import { MovieComponent } from './movie/movie.component';
import { ChatComponent } from './chat/chat.component';
import { EnterSubmitDirective } from './enter-submit.directive';
import { ChatsComponent } from './chats/chats.component';
import { SomePipePipe } from '../some-pipe.pipe';


@NgModule({
  declarations: [HomeComponent, 
    LoginComponent, 
    CreateuserComponent,
    OnFocusDirective,
    MovieslistComponent,
    AddmovieComponent,
    ChangePasswordComponent,
    MovieComponent,
    ChatComponent,
    EnterSubmitDirective,
    ChatsComponent,
    SomePipePipe,],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSocialLoginModule.init(
      {
          google: {
              client_id: '879553022561-9n7nc48naa3b4jcs581naiupi0urnn1v.apps.googleusercontent.com'
          },
          facebook: {
              initOptions: {
                  appId: '884802702020092'
              }
          }
      }
  )
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true
  }]
})
export class HomeModule { }
