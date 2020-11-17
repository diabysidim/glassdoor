import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { UserProfileService } from '../user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  providers:[UserProfileService]
})
export class UserRegisterComponent implements OnInit {
  profile: any;
  constructor(private _location : Location, private userProfile: UserProfileService,
     private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {

      this.route.data.subscribe(data=>{
        
        console.log(data["profile"])
        this.profile = data["profile"]

      })
  }

  onSubmit(form):void{
    this.userProfile.postUser(form.value).subscribe( data=>{

      console.log(data);
      localStorage.setItem("account_typeId", data._id)
      this.profile.account_typeId = data._id
      console.log(this.profile.account_typeId)
    }, err=>{
      console.log(err)
    }, ()=>{
      
      this.router.navigate(["/users/"+this.profile.account_typeId])
    })
   
  }
  
  Cancel():void{

    this._location.back();
  }

}
