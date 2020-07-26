import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountModalComponent } from './account-modal/account-modal.component';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss']
})
export class ViewAccountComponent implements OnInit {

  @ViewChild(AccountModalComponent) accountModal;
  constructor() { }

  ngOnInit(): void {
  }

  showUsernameModal():void{

    this.accountModal.showUsernameModal();
  }

  showPasswordModal():void{

    this.accountModal.showPasswordModal();
  }

}
