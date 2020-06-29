import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WildcardComponent } from './wildcard/wildcard.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  {path: '**', component: WildcardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
