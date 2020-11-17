import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';

import {CompanyService} from "../company/company.service"

import { UserProfileService } from '../user/user-profile.service';
import { JobsService} from "../jobs.service"









@Injectable()
export class SearchResolver implements Resolve< any> {
  constructor(private companyService: CompanyService, private userService : UserProfileService, private jobService: JobsService ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {

    

    if(route.queryParams["type"]==="company"){
           
                
             return   this.companyService.fetchCompanies(route.queryParams["search"]);

            }
    else if(route.queryParams["type"]==="user"){

            return this.userService.fetchUsers(route.queryParams["search"])
            }

    else{   
            return this.jobService.fetchJobs(route.queryParams["search"])

         }


  }
}