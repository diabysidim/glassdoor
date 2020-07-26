import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import $ from "jquery";
import { JobsService } from 'src/app/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.scss'],
  providers: [JobsService]
})

export class JobModalComponent implements OnInit {

  @Output() needsRefresh = new EventEmitter<{isChange: boolean}>();
  public job ={
    _id: "",
    company: "",
    job_title: "",
    job_description: "",
    location: "",
    salary: "",
    type: "",
    exp_level: "",
    posted_date: "",
    deadline: "",
    __v: "",
    

  };



  constructor( private jobData: JobsService, private router :Router  ) { }

  ngOnInit(): void {
    
  }

  showUpdateModal(job){

    this.job=job;
    $('#updateModal').modal('show')


  }

  showDeleteModal(job){

    this.job=job;
    
    $('#deleteModal').modal('show')
  }

  showViewModal(job){
    this.job=job;
   
    $('#viewModal').modal('show')

  }

  pickDate():void{

    $('#standard_calendar').calendar({type: 'date'})
  }

  deleteJob(job): void{

  
  
    this.jobData.deleteJob(job._id).subscribe(job =>{

      $('#deleteModal').modal('hide')
    
      this.refreshParent()
     
    },(error)=>{}, ()=>{

      this.refreshParent()
    })


  }


  updateJob(form): void{

    
    console.log( "current job", this.job);
    console.log("value from the form ", form);

    this.job=  form.value
    
    this.jobData.updateJob(this.job._id, this.job).subscribe(job=> {

    
      $('#updateModal').modal('hide')

      
    

    },(error)=>{}, ()=>{

      this.refreshParent()
    })
  }

  refreshParent(): void{

    this.needsRefresh.emit();
  }



}
