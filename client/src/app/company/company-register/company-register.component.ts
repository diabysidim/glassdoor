import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Companies } from '../Companies';
@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss']
})
export class CompanyRegisterComponent implements OnInit {

  type: string = "company";
  company:Companies;
  constructor(private _location : Location, 
    private companyService: CompanyService, 
    private router: Router) { }

  ngOnInit( ): void {



  }

  onSubmit(form): void{

    this.companyService.postCompany(form.value).subscribe(data=>{

        localStorage.setItem("account_typeId", data._id)
        this.company = data;
    }, err=>{}, ()=>{

        this.router.navigate(["/companies/"+ this.company._id])
        
    })
   
  }

  Cancel(){

    this._location.back();
  }
}
