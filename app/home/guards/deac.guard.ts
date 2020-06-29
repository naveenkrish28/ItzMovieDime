import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CreateuserComponent } from "../createuser/createuser.component";
import { Observable } from "rxjs";

export interface CanDeacInterface{
canDeactivate : () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
    providedIn: "root"
})
export class DeacGuard implements CanDeactivate<CanDeacInterface> {
    canDeactivate(component: CanDeacInterface,
                 route: ActivatedRouteSnapshot,
                 state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
                    return component.canDeactivate();
                 } 
}