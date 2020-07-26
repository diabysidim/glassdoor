import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../company.service";
import $ from 'jquery';
import { from } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  company_id:string;
  company: any;
  constructor( private companyData: CompanyService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {

    console.log(this.router.routerState)
    
    this.route.data.subscribe(
      (data)=>{

          console.log(data);
          this.company = data["Company"]
          this.company_id = this.company._id;

      }
    )

  
  
  }

  

  onSubmit(form){

    this.companyData.updateCompany(this.company_id, form.value).subscribe(data=>{
      console.log(data)
    }, (error)=>{}, ()=>{

      this.router.navigate(["/companies/"+ this.company_id]);
    })
  }

}
