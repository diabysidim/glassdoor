import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {ReviewService} from "../../review.service";

@Component({
  selector: 'app-company-reviews',
  templateUrl: './company-reviews.component.html',
  styleUrls: ['./company-reviews.component.scss']
})
export class CompanyReviewsComponent implements OnInit {

  public reviewList: any[];
  public company_id: string;

 
  constructor(private reviewService: ReviewService, private route: ActivatedRoute) {   }

  needsRefresh: boolean =true;

  ngOnInit(): void {

    this.route.parent.paramMap.subscribe(( paramMap: ParamMap ) => {

        this.company_id= paramMap.get("id")  

        this.getReviews(this.company_id);

    })
    

   
  }

  getReviews(id): void{

    this.reviewService.fetchReviewByCompanyId(this.company_id).subscribe( reviews=>{

        this.reviewList = reviews;

        console.log(reviews);


      }


    )
  }

}
