import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {CompanyService} from "../company.service";
import $ from 'jquery';
import { from } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {



  company_id:string;
  company: any={};

  constructor( private companyData: CompanyService, private route: ActivatedRoute, private router: Router ) { }

  ngOnChanges(){

    // this.route.params.subscribe((params: Params)=>{

    //   this.company_id = params["id"]

    

    // }, (err)=>{}, ()=>{

    //   this.getCompany(this.company_id);
    // })
    console.log("changes")
  }

  ngOnInit(): void {   

    this.route.params.subscribe((params: Params)=>{

      this.company_id = params["id"]

    

    }, (err)=>{}, ()=>{

      this.getCompany(this.company_id);
    })

    console.log("init")
  
  
  }

  getCompany(id):void{

  
    this.companyData.fetchCompanyById(id).subscribe( company=>{

      this.company = company;
    }, (error)=>{

        if(error instanceof HttpResponse) {
  
            if(error.status === 404){

              this.router.navigate["/404"]
            }
  
        }
    


      })
  }

}
