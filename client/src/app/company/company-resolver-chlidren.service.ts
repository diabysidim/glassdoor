import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {Companies} from "./Companies";

import {CompanyService} from "./company.service";






@Injectable()
export class CompanyResolverChildren implements Resolve<Companies> {
  constructor(private companyService: CompanyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Companies>  {
      console.log(route.parent.params['id'])
    return this.companyService.fetchCompanyById(route.parent.params['id']);
  }
}