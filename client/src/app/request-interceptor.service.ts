import { Injectable, Injector } from '@angular/core';
import {  HttpInterceptor } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req, next){


    console.log("interceptiing")

    let currentReq = req.clone({
      setHeaders:{
        Authorization: "Bearer "+ localStorage.getItem("token")
      }
    })
    return next.handle(currentReq);
  }
}
