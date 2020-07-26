import { Component, OnInit, Input } from '@angular/core';
import $ from 'jquery';
import { LoginService } from '../login.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Companies } from '../company/Companies';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss'], 
  providers: [LoginService]
})
export class SigninModalComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  profile: any;

  @Input() displaySigninModal() : void{

    $('#signinModal').modal('show')
  }
 
 submit(form): void{
  console.log(form.value)
    this.loginService.handleLogin(form.value).subscribe(data=>{
        this.profile = data;
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("token",data.token);
        localStorage.setItem("type", data.user.type);
        localStorage.setItem("account_typeId", data.relatedProfile)
      



    }, (err)=>{

      console.log(err)
    },()=>{
      $('#signinModal').modal('hide')
      this.navigateToProfile();
    })


 }

 navigateToProfile(): void{

  if(this.profile.user.type === "company") {
    console.log(`/companies/${this.profile.relatedProfile}`)
    this.router.navigate([`/companies/${this.profile.relatedProfile}`])
  }

  else this.router.navigate[`/users/${this.profile.relatedProfile}`];
 }

}
