import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss']
})
export class CompanySearchComponent implements OnInit {

  @Input() result;
  constructor() { }

  ngOnInit(): void {
  }

}
