import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  constructor(private _location : Location) { }

  ngOnInit(): void {
  }

  onSubmit(form):void{

    console.log(form.value)
  }
  
  Cancel():void{

    this._location.back();
  }

}
