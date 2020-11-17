import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../UserType';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: Users;
  constructor( private route: ActivatedRoute, private userProfile: UserProfileService, private router: Router) { }

  ngOnInit(): void {

    this.route.data.subscribe(data=>{

      this.user = data["User"];
    })
  }

  submit(form): void{

      this.userProfile.updateUser(this.user._id, form.value).subscribe(data=>{

        console.log(data);
      }, err=>{}, ()=>{

          this.router.navigate(["/users/"+this.user._id])

      })
    
  }

}
