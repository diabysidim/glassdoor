import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{ FormsModule} from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Component, OnInit } from '@angular/core';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SigninModalComponent } from './signin-modal/signin-modal.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { CompanyRegisterComponent } from './company/company-register/company-register.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { CompanyDashboardComponent } from './company/company-dashboard/company-dashboard.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { DisplayJobsComponent } from './company/display-jobs/display-jobs.component';
import { PostJobsComponent } from './company/post-jobs/post-jobs.component';
import { CompanyReviewsComponent } from './company/company-reviews/company-reviews.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserReviewComponent } from './user/user-review/user-review.component';
import { AccountModalComponent } from './view-account/account-modal/account-modal.component';
import { JobModalComponent } from './company/job-modal/job-modal.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { from } from 'rxjs';
import { ErrorPageComponent } from './error-page/error-page.component';
import {RequestInterceptorService} from "./request-interceptor.service";
import {AuthGuard} from "./auth.guard";
import { CompanyResolver } from './company/company-resolver.service';
import { CompanyResolverChildren } from './company/company-resolver-chlidren.service';
import { NavbarResolver } from './navbar/navbar-resolver.service';

declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    FooterComponent,
    SigninModalComponent,
    RegisterComponent,
    HomeComponent,
    CompanyComponent,
    UserComponent,
    CompanyRegisterComponent,
    UserRegisterComponent,
    UserDashboardComponent,
    CompanyDashboardComponent,
    HomeDashboardComponent,
    CompanyProfileComponent,
    DisplayJobsComponent,
    PostJobsComponent,
    CompanyReviewsComponent,
    ViewAccountComponent,
    CompanyEditComponent,
    UserProfileComponent,
    UserEditComponent,
    UserReviewComponent,
    AccountModalComponent,
    JobModalComponent,
    ErrorPageComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptorService,
    multi:true
  }, AuthGuard, CompanyResolver, CompanyResolverChildren, NavbarResolver],
  bootstrap: [AppComponent]
})
export class AppModule {


  constructor() { }

ngOnInit() {}
 }
