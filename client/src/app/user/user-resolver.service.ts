
  import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {Users} from "./UserType";

import {UserProfileService} from "./user-profile.service";






@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<Users> {
  constructor(private UserProfileService: UserProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Users>  {
      console.log(route.params['id'])
    return this.UserProfileService.fetchUserById(route.params['id']);
  }
}