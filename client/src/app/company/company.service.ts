import { Injectable } from '@angular/core';

import {Observable, throwError, Subject} from 'rxjs';


import {catchError, tap} from 'rxjs/operators';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Companies } from "./Companies";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _refreshNeeded = new Subject <void>();
  getRefresh(){

    return this._refreshNeeded;
  }
  private _URL= "http://localhost:3000/Companies";
  
  constructor(private http: HttpClient, private router: Router) { }

  fetchCompanies(id?): Observable<Companies[]>{

    return this.http.get<Companies []>(this._URL+"?name="+id).pipe(catchError(this.errorHandler))

   
  }

  fetchCompanyById(id:string): Observable<Companies>{

    return this.http.get<Companies >(this._URL+"/"+id).pipe(catchError(this.errorHandler));
  }



  

  postCompany(data): Observable<Companies>{

    return this.http.post<Companies>(this._URL, data).pipe(catchError(this.errorHandler));
  }

  updateCompany(id:string, data) : Observable<Companies>{

    return this.http.put<Companies>(this._URL+"/"+id, data).pipe(catchError(this.errorHandler));
  }

  deleteCompany (id:string) {

    return this.http.delete(this._URL+"/"+id);
  }

  logout(){

    localStorage.clear();
    this.router.navigate(["/"])
  
  }



  errorHandler(error: HttpErrorResponse){
  

      console.log("in error handler")
  
       
      return throwError(error || "Server Error");


}

}

