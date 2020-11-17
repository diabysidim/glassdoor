
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {Users} from "./UserType";

import {UserProfileService} from "./user-profile.service";






@Injectable({providedIn: 'root'})
export class UserResolverChildren implements Resolve<Users> {
  constructor(private UserService: UserProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Users>  {
      console.log(route.parent.params['id'])
    return this.UserService.fetchUserById(route.parent.params['id']);
  }
}