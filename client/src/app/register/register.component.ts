import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from "./../login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    
  }

  onSubmit( form: NgForm){

    


    this.registerAccount(form.value);

    
  }

  registerAccount(account): void{

      console.log(account)
    this.loginService.handleRegister(account).subscribe( data =>{


        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("token",data.token);
        localStorage.setItem("type", data.user.type);
        localStorage.setItem("username", data.user.username);

        localStorage.setItem("account_typeId", data.relatedProfile)
      

    
    }, err=>{}, ()=>{

      if(account.type ==="company"){

        this.router.navigate(["/companies/register"])
      }
      else{
  
  
          this.router.navigate(["/users/register"])
  
      }
    }  
    )
      


  }


    

}
