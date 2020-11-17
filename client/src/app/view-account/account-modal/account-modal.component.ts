import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login.service';
@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss']
})
export class AccountModalComponent implements OnInit {
  loginCredential ={};

  constructor( private loginService : LoginService, private route: ActivatedRoute) { }

  profile: any;

  ngOnInit(): void {

      this.route.data.subscribe(data=>{

        this.profile = data["profile"];
      })
  }
  
  updateUsername(form): void{



    this.loginService.updateAccount(this.profile.userId, form.value).subscribe(data=>{

      this.profile.username = data.user.username;
      localStorage.setItem("username",this.profile.username)
      this.closeUsernameModal();
    });

   

  }

  updatePassword(form): void{
    try{
      if(form.value.password!==form.value.passwordConfirmation) 
      
      throw new Error("the passwords are differents");
      

          this.loginService.updateAccount(this.profile.userId, form.value).subscribe(data=>{

          
          this.closePasswordModal();
        });


    }catch(e){

      console.log(e);
    }
     
  }

  showUsernameModal(){

    
    $("#updateUsernameModal").modal("show");


  }

  showPasswordModal(){
    $("#updatePasswordModal").modal("show");
    
  }

  closePasswordModal(){

    $("#updatePasswordModal").modal("hide");
  }

  closeUsernameModal(){

    $("#updateUsernameModal").modal("hide");
  }

}
