import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountModalComponent } from './account-modal/account-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss']
})
export class ViewAccountComponent implements OnInit {

  @ViewChild(AccountModalComponent) accountModal;
  
      constructor( private route: ActivatedRoute) { }

        profile: any;
        
        ngOnInit(): void {

            this.route.data.subscribe(data=>{

              this.profile = data["profile"];
            })
        }
  showUsernameModal():void{

    this.accountModal.showUsernameModal();
  }

  showPasswordModal():void{

    this.accountModal.showPasswordModal();
  }

}
