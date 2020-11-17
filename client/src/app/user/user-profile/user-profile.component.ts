import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../UserType';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  user: any;
  ngOnInit(): void {

      this.route.data.subscribe(data=>{

        this.user = data["User"];

        console.log(this.user)
        
      })
    
    
  }

}
