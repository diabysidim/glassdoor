import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { JobsService } from '../jobs.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { JobModalComponent } from '../company/job-modal/job-modal.component';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {

  public jobList: any[];

  @ViewChild(JobModalComponent)  jobModal
  company_id: string;
  @Input() result;
  constructor(private JobsData: JobsService, private route: ActivatedRoute) {   }


  ngOnInit(): void {

    
    this.JobsData.fetchJobs().subscribe(jobs=>{

      this.jobList= jobs;
    })
    

   
  }


  ngOnChanges(): void{

    this.JobsData.fetchJobs().subscribe(jobs =>{
      this.jobList = jobs;
      console.log(this.jobList);
    })

  }

 

  showViewModal(job) : void {

    this.jobModal.showViewModal(job);
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
