import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { HomeModule } from "../app/home/home.module";
import { MatButtonModule } from "@angular/material/button";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { AppComponent } from './app.component';
import { WildcardComponent } from "./wildcard/wildcard.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    WildcardComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCo__rzx0R3HPYN4I4IAgHmOYFcaT0wOAI",
      authDomain: "itzmoviedime.firebaseapp.com",
      databaseURL: "https://itzmoviedime.firebaseio.com",
      projectId: "itzmoviedime",
      storageBucket: "itzmoviedime.appspot.com",
      messagingSenderId: "879553022561",
      appId: "1:879553022561:web:784e6f12284ef9fc4bb820",
      measurementId: "G-1KMMMB33B4"
    }),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
