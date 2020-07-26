import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { NgForm } from '@angular/forms';
import { JobsService } from 'src/app/jobs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Companies } from '../Companies';
import { CompanyResolverChildren } from '../company-resolver-chlidren.service';
@Component({
  selector: 'app-post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.scss'],
  providers: [CompanyResolverChildren]
})
export class PostJobsComponent implements OnInit {

  company: Companies ; 
  constructor(  private Jobservice : JobsService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.parent.data);
    this.route.data.subscribe(
      (data)=>{

         console.log(data)
          this.company = data["Company"]

      }
    )


  }

  pickDate():void{

    $('#standard_calendar')
  .calendar({type: 'date'})
  }

  submit(data: NgForm): void{

    this.Jobservice.postJob(data.value).subscribe(job=>{

      console.log(job);
      return;
    }, (error)=>{}, ()=>{
      this.navigateToJobs();
    })
      

  }

  navigateToJobs(){

    console.log(this.router.navigate([`/companies/${this.company._id}/jobs`]))
    this.router.navigate([`/companies/${this.company._id}/jobs`])
  }

}
