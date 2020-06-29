import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { HomeComponent } from './home.component';
import { LoginGuard } from './guards/login.guard';
import { MovieslistComponent } from './movieslist/movieslist.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { LogoutGuard } from './guards/logout.guard';
import { MovieComponent } from './movie/movie.component';
import { ChatComponent } from './chat/chat.component';
import { ChatsComponent } from './chats/chats.component';
import { DeacGuard } from './guards/deac.guard';


const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'create', component: CreateuserComponent, canActivate: [LoginGuard], canDeactivate: [DeacGuard]},
  {path: 'movies', component: MovieslistComponent},
  {path: 'addmovie', component: AddmovieComponent, canActivate: [LogoutGuard]},
  {path: 'changepass', component: ChangePasswordComponent, canActivate: [LogoutGuard]},
  {path: 'movie/:id', component: MovieComponent},
  {path: 'chats',component: ChatsComponent, canActivate: [LogoutGuard]},
  {path: 'chat', component: ChatComponent, canActivate: [LogoutGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
