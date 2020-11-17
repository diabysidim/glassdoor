import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CompanyRegisterComponent } from './company/company-register/company-register.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { CompanyDashboardComponent } from './company/company-dashboard/company-dashboard.component';
import { CompanyComponent } from './company/company.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { PostJobsComponent } from './company/post-jobs/post-jobs.component';
import { DisplayJobsComponent } from './company/display-jobs/display-jobs.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { CompanyReviewsComponent } from './company/company-reviews/company-reviews.component';
import { UserComponent } from './user/user.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserReviewComponent } from './user/user-review/user-review.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard } from './auth.guard';
import {CompanyResolver} from "./company/company-resolver.service";
import {CompanyResolverChildren} from "./company/company-resolver-chlidren.service";
import {NavbarResolver} from "./navbar/navbar-resolver.service";
import { UserResolver } from './user/user-resolver.service';
import { UserResolverChildren } from './user/user-resolver-children.service';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import {SearchResolver} from "./home-dashboard/home-resolver.service"

const routes: Routes = [
  {path:"", component: HomeComponent, resolve: {profile: NavbarResolver}},
  {path:"search", component: HomeDashboardComponent, resolve:{ profile: NavbarResolver, search: SearchResolver}},
  {path:"register", component: RegisterComponent, resolve: {profile: NavbarResolver}},
  {path:"companies", component: CompanyComponent, resolve: {profile: NavbarResolver}, children:[

    {path:"register", component: CompanyRegisterComponent, pathMatch:"full"},
    {path:":id", component: CompanyDashboardComponent, resolve: {Company: CompanyResolver, profile: NavbarResolver}, canActivate: [AuthGuard], canActivateChild:[AuthGuard], children:[

      {path:"", component: CompanyProfileComponent, resolve: {Company: CompanyResolver, profile: NavbarResolver}},
      {path:"edit", component: CompanyEditComponent, resolve: {Company: CompanyResolverChildren, profile: NavbarResolver}},
      {path:"jobs", component: DisplayJobsComponent,resolve: {Company: CompanyResolverChildren, profile: NavbarResolver}},
      {path:"jobs/new", component: PostJobsComponent, resolve: {Company: CompanyResolverChildren, profile: NavbarResolver}},
      {path:"account", component: ViewAccountComponent,resolve: {Company: CompanyResolverChildren, profile: NavbarResolver}},
      {path:"reviews", component: CompanyReviewsComponent,resolve: {Company: CompanyResolverChildren, profile: NavbarResolver}}

    ]}
    
  ]},

  {path:"users", component: UserComponent , children:[
    {path:"register", component: UserRegisterComponent, resolve: {profile: NavbarResolver}},

    {path:":id", component: UserDashboardComponent, resolve: {User: UserResolver , profile: NavbarResolver}, canActivate: [AuthGuard], canActivateChild:[AuthGuard], children:[

      {path:"", component: UserProfileComponent,  resolve: {User: UserResolver , profile: NavbarResolver}, canActivate: [AuthGuard], canActivateChild:[AuthGuard]},
      {path:"edit", component: UserEditComponent,  resolve: {User: UserResolverChildren , profile: NavbarResolver}},
      {path:"account", component: ViewAccountComponent,  resolve: {User: UserResolverChildren , profile: NavbarResolver}},
      {path:"reviews", component: UserReviewComponent,  resolve: {User: UserResolverChildren , profile: NavbarResolver}}

    ]},
   
  ]},
  {path: '404', component: ErrorPageComponent },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
