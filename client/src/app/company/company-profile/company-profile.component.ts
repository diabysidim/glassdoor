import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../company.service";
import $ from 'jquery';
import { from } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  company_id:string;
  company: any;
  constructor( private companyData: CompanyService, private route: ActivatedRoute ) { }

  ngOnInit(): void {

    $(document).ready(function(){
      // All your normal JS code goes in here
      $(".rating").rating({
        icon: 'circle',
        initialRating: 5,
        maxRating: 5
      });
    });


    this.route.data.subscribe(
      (data)=>{

          console.log(data);
          this.company = data["Company"]

      }
    )


    // this.route.parent.paramMap.subscribe((params: ParamMap)=>{
      
     
    //   this.company_id = params.get("id");
    //   console.log(this.company_id)

    //   this.getCompany(this.company_id);

    // }, (error)=>{

    //   if(error instanceof HttpResponse) {

    //       if(error.status === 404)

    //   }


    // })
  
  
  }

  getCompany(id):void{

    this.companyData.fetchCompanyById(id).subscribe( company=>{

      this.company = company;
    

    }, (error:any)=>{


      console.log(error);
    }


    )
  }

}
