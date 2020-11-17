import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  profile: any;
  user: any;
  ngOnInit(): void {

    this.route.data.subscribe(data=>{

      this.profile = data["profile"]
      console.log(data["User"])
      this.user = data["User"]
    }, (error)=>{

      if(error instanceof HttpResponse){

        if(error.status === 401){
          this.logout();
        }
        else if(error.status === 404 || error.status=== 500 ){

          this.router.navigate(["/404"])
        }
      }
    })
  }

  logout(){

      localStorage.clear();
      this.router.navigate(["/"])

  }

}
