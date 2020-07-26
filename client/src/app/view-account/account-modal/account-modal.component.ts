import { Component, OnInit } from '@angular/core';
import $ from "jquery";
@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss']
})
export class AccountModalComponent implements OnInit {
  loginCredential ={};

  constructor() { }

  ngOnInit(): void {


  }
  
  updateUsername(form): void{

    console.log("update User");
    this.closeUsernameModal();

  }

  updatePassword(form): void{

    console.log("update password")
    this.closePasswordModal();

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
