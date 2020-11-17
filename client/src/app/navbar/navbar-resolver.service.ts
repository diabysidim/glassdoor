import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import{ Users} from '../User';






@Injectable()
export class NavbarResolver implements Resolve<{account_typeId: string, type:string, username: string, userId:string}> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): {account_typeId: string, type:string, username:string, userId:string}  {

    let local = localStorage.getItem("userId");
    if(local) return {  account_typeId: localStorage.getItem("account_typeId"),
           type: localStorage.getItem("type"), 
          username:  localStorage.getItem("username"),
           userId: local }
    else return null;
    
  }
}