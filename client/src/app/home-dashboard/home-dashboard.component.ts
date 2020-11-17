import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company/company.service';
import { JobsService } from '../jobs.service';
import { UserProfileService } from '../user/user-profile.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute,
      private companyService: CompanyService, 
      private userService : UserProfileService, 
      private jobService: JobsService) { }
  @Output() result: any;
  @Input() type: string;

 
  ngOnInit(): void {

    
   

    this.route.data.subscribe(data=>{

      this.result = data["search"];
      this.type = this.route.snapshot.queryParams["type"]

    })

    
  }

  updateSearch(event){


        this.type = event.type;
        
    if(this.type==="company"){
           
                
      return   this.companyService.fetchCompanies(event.search).subscribe(data=>{

          this.result = data;

      });

     }
else if(this.type==="user"){

     return this.userService.fetchUsers(event.search).subscribe(data=>{

      this.result = data;

  });
     }

else{   
     return this.jobService.fetchJobs(event.search).subscribe(data=>{

      this.result = data;

  });

  }
  }



}
