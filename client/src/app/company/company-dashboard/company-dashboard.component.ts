import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {CompanyService} from "../company.service";
import $ from 'jquery';
import { from } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Users } from 'src/app/User';
@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {



  company_id:string;
  company: any={};
  profile: any;

  constructor( private companyData: CompanyService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {   

    console.log("in dashboard")
    this.route.data.subscribe(data=>{

      console.log(data["Company"], data["profile"])
      this.company = data["Company"];
      this.company_id = this.company._id;
      this.profile = data["profile"]

      

    },(error)=>{

      console.log("i'm in error please")
      if(error instanceof HttpResponse){

        if(error.status === 401){
          this.logout();
        }
        else if(error.status === 404 || error.status=== 500 ){

          this.router.navigate(["/404"])
        }
      }
    })
  }

  logout(){

      localStorage.clear();
      this.router.navigate(["/"])

  }

  // getCompany(id):void{

  
  //   this.companyData.fetchCompanyById(id).subscribe( company=>{

  //     this.company = company;
  //   }, (error)=>{

  //       if(error instanceof HttpResponse) {
  
  //           if(error.status === 404){

  //             this.router.navigate["/404"]
  //           }
  
  //       }
    


  //     })
  // }

}
