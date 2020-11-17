import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {CompanyService} from "../company.service";
import $ from 'jquery';
import { from } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ReviewService } from 'src/app/review.service';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
  providers: [CompanyService]
})
export class CompanyProfileComponent implements OnInit {
  company_id:string;
  company: any;
  profile: any;
  comment: string;
  constructor( private companyData: CompanyService, 
     private route: ActivatedRoute, 
     private router: Router ,
     private reviewService: ReviewService) { }


  ngOnInit(): void {

    $(document).ready(function(){
      // All your normal JS code goes in here
      $(".rating").rating({
        icon: 'circle',
        initialRating: 5,
        maxRating: 5
      });
    });
   

    this.route.data.subscribe(
     
      (data)=>{

          console.log(data);
          this.company = data["Company"]
          this.profile = data["profile"];

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

    onSubmit(e){

   

      this.reviewService.postReview(e.value).subscribe(data=>{

        this.needsRefresh()
        console.log(data)

      })
      
    }

    needsRefresh(){

      this.companyData.fetchCompanyById(this.company._id).subscribe(data=>{

          this.company = data;
          this.comment ="";

      })
    }
  
  
  }

 
  


