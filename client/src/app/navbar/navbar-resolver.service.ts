import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import{ Users} from '../User';






@Injectable()
export class NavbarResolver implements Resolve<{account_typeId: string, type:string, username: string}> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): {account_typeId: string, type:string, username:string}  {

    let local = localStorage.getItem("account_typeId");
    console.log(local)
    if(local) return {  account_typeId: localStorage.getItem("account_typeId"),
           type: localStorage.getItem("type"), 
          username:  localStorage.getItem("username")}
    else return null;
    
  }
}