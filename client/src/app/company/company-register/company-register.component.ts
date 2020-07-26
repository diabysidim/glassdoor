import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss']
})
export class CompanyRegisterComponent implements OnInit {

  constructor(private _location : Location) { }

  ngOnInit( ): void {
  }

  onSubmit(form): void{

    console.log(form.value)
   
  }

  Cancel(){

    console.log("cancelled")
    this._location.back();
  }
}
