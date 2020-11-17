

  import { Injectable } from '@angular/core';

  import {Observable, throwError} from 'rxjs';
  
  
  import {catchError} from 'rxjs/operators';
  
  import {HttpClient, HttpErrorResponse} from '@angular/common/http';
  import { Users } from "./User";
  
  @Injectable({
    providedIn: 'root'
  })
  export class LoginService {
  
    
    private _URL= "http://localhost:3000/";
    constructor(private http: HttpClient) { }
  
    
  
    handleLogin(data): Observable<Users>{
  
      return this.http.post<Users>(this._URL+"login", data).pipe(catchError(this.errorHandler));
    }

    handleRegister(data): Observable<Users>{
  
      return this.http.post<Users>(this._URL+"register", data).pipe(catchError(this.errorHandler));
    }

    handleLogout(data): Observable<Users>{
  
      return this.http.post<Users>(this._URL+"logout", data).pipe(catchError(this.errorHandler));
    }

    handleLogoutAll(data): Observable<Users>{
  
      return this.http.post<Users>(this._URL+"LogoutAll", data).pipe(catchError(this.errorHandler));
    }
  
    updateAccount(id:string, data) : Observable<Users>{
  
      return this.http.put<Users>(this._URL+"logins/"+id, data).pipe(catchError(this.errorHandler));
    }
  
    deleteJob (id:string) {
  
      return this.http.delete(this._URL+"/"+id);
    }

    isLoggedIn(){

      return !!localStorage.getItem("token")

    }
  
  
  
  
    errorHandler(error: HttpErrorResponse){
  
        return throwError(error.message || "Server Error");
  
    }
  }
  