import { Component, OnInit, ViewChild } from '@angular/core';
import { JobModalComponent } from '../job-modal/job-modal.component';
import {HttpClientModule} from '@angular/common/http';

import { from } from 'rxjs';

import {JobsService} from "../../jobs.service";
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Users } from 'src/app/user/UserType';

@Component({
  selector: 'app-display-jobs',
  templateUrl: './display-jobs.component.html',
  styleUrls: ['./display-jobs.component.scss'],
  providers: [JobsService]
})
export class DisplayJobsComponent implements OnInit {
  public jobList: any[];
  accountId: string;
  @ViewChild(JobModalComponent)  jobModal
  company_id: string;
  constructor(private JobsData: JobsService, private route: ActivatedRoute) {   }


  ngOnInit(): void {

    this.route.parent.paramMap.subscribe(( paramMap: ParamMap ) => {

        this.company_id= paramMap.get("id");
        this.fetchJobsByCompanyId(this.company_id);

        
        
        this.accountId = localStorage.getItem("account_typeId");

        console.log(this.company_id);
        console.log(this.accountId)

       

    })

    
    

   
  }


  ngOnChanges(): void{

    this.JobsData.fetchJobs().subscribe(jobs =>{
      this.jobList = jobs;
      console.log(this.jobList);
    })

  }

  showDeleteModal(job) : void {

    this.jobModal.showDeleteModal(job);
  }

  showViewModal(job) : void {

    this.jobModal.showViewModal(job);
  }
  showUpdateModal(job) : void {

    this.jobModal.showUpdateModal(job);
  }

  
  needsRefresh(event){

      this.fetchJobsByCompanyId(this.company_id);
  }

  fetchJobsByCompanyId(id){

    this.JobsData.fetchJobsByCompanyId(id).subscribe(jobs =>{
      this.jobList = jobs;
      
    })
  }


  

  
  
}
