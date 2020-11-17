import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {SigninModalComponent } from "../signin-modal/signin-modal.component"
import { Users } from '../User';
import { Router, ActivatedRoute } from '@angular/router';
import $ from "jquery";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild(SigninModalComponent) SigninModal

  @Output("myEvent") searchEvent = new EventEmitter<{type:string , search:string}>();

  constructor( private route: ActivatedRoute, private router: Router) { }
  
 
  profile: any;
  type: string = "job";


  ngOnInit(): void {

        this.route.data.subscribe(data=>{

          this.profile = data["profile"];         

        })


            
  }

  ngAfterViewInit(){

    $('.dropdown').dropdown();
  }

  displaySigninModal(){


    this.SigninModal.displaySigninModal();
  }

  IsSignin(event){
    
      this.profile = event;

  }

  logout(){

    localStorage.clear()
    this.profile =null;
  }

  onSubmit(form): void{

    this.updateSearch({type:form.value.type, search: form.value.search})
    this.router.navigate(['/search'], { queryParams: { type: form.value.type, search: form.value.search } });
    
  }

  updateSearch(obj){

     this.searchEvent.emit(obj)
    
    
  }
  
}

