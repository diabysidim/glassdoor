import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../UserType';
import { Reviews } from 'src/app/Reviews';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss']
})
export class UserReviewComponent implements OnInit {

  constructor(private reviewService: ReviewService, 
    private route: ActivatedRoute, 
    private router: Router) { }
    
    user: Users;
    reviewList: any [];

  ngOnInit(): void {
    

    this.route.data.subscribe(data=>{

      this.user = data["User"];
      console.log("the user is" , this.user)

      this.getReviews(this.user._id)
    
      
    }, error=>{}, ()=>{

      this.getReviews(this.user._id)
    })

  }

  getReviews(id){

      this.reviewService.fetchReviewByUserId(id).subscribe(data=>{

          this.reviewList = data;
      }, err=>{

      
      })

  }

}
