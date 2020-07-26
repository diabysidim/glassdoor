import { Component, OnInit, ViewChild } from '@angular/core';
import {SigninModalComponent } from "../signin-modal/signin-modal.component"
import { Users } from '../User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild(SigninModalComponent) SigninModal
  constructor( private route: ActivatedRoute) { }
  
 
  profile: any;

  ngOnInit(): void {

        this.route.data.subscribe(data=>{

          this.profile = data["profile"];
          console.log(this.profile)

        })


            
  }

  displaySigninModal(){


    this.SigninModal.displaySigninModal();
  }

  IsSignin(event){
    
      this.profile = event;

  }

  logout(){

    localStorage.clear()
    this.profile =null;
  }

}
