import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor( private loginService: LoginService, private router: Router){

  }

  
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

      if(this.loginService.isLoggedIn()){

       
        
        return true
      }
      else{

        this.router.navigate["/"]   
        return false;
      }

    

  }
  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      
      const url = state.url;

      if(this.loginService.isLoggedIn()){

      console.log("can access");
      return true;
    }
    else{

      console.log("cannot Access")
      this.router.navigate["/"]   
      return false;
    }
  }


  

  
  
  
}
