import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  @Input() result;
  constructor() { }

  ngOnInit(): void {
  }

}
