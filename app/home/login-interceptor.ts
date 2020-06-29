import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType, HttpEvent, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";

export class LoginInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // const request = req.clone({
        //     headers: req.headers.append("Access-Control-Allow-Origin", "*")
        // })
        return next.handle(req);
    }
}