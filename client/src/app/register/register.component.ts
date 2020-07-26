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

    this.loginService.handleRegister(account).subscribe( data =>{


      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token)

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
