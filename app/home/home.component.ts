import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  date = new Date();
  url: string;
  constructor(public login: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (localStorage.getItem("currentRoute")) {
      if (localStorage.getItem("currentRoute") == "/home") {
        localStorage.setItem("currentRoute", "/home/movies");
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.setRoutes(event);
          }
        });
        this.router.navigate(['home/movies']);
      } else {
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.setRoutes(event);
          }
        });
        this.router.navigate([localStorage.getItem("currentRoute")]);
      }
    } else {
      localStorage.setItem("currentRoute", "/home/movies");
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
         this.setRoutes(event);
        }
      });
      this.router.navigate(['home/movies']);
    }
  }

  setRoutes(event: NavigationEnd) {
    localStorage.setItem("previousRoute", localStorage.getItem("currentRoute"));
    this.url = event.url.indexOf("?") > 0 ? event.url.slice(0, event.url.indexOf("?")) : event.url;
    localStorage.setItem("currentRoute", this.url);
  }

  onLogout() {
    this.login.isLoggedIn = false;
    this.login.isAdmin = false;
    localStorage.removeItem("email");
    localStorage.removeItem("key");
    if (localStorage.getItem("Admin")) {
      localStorage.removeItem("Admin");
    }
  }
  onDelete() {
    this.login.isLoggedIn = false;
    this.login.deleteUser().subscribe(() => {

    },
      () => {
        console.log("Unable to Subscribe");
      });
  }
  ngOnDestroy() {
    localStorage.removeItem("previousRoute");
    localStorage.removeItem("currentRoute");
  }
}
