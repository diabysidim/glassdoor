import { Injectable } from '@angular/core';

import {Observable, throwError, Subject} from 'rxjs';


import {catchError, tap} from 'rxjs/operators';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Users } from "./UserType";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private _URL= "http://localhost:3000/users";
  constructor(private http: HttpClient) { }

  fetchUsers(id?): Observable<Users[]>{

    return this.http.get<Users []>(this._URL+"?name="+id).pipe(catchError(this.errorHandler))

   
  }

  fetchUserById(id:string): Observable<Users>{

    return this.http.get<Users >(this._URL+"/"+id).pipe(catchError(this.errorHandler));
  }



  

  postUser(data): Observable<Users>{

    return this.http.post<Users>(this._URL, data).pipe(catchError(this.errorHandler));
  }

  updateUser(id:string, data) : Observable<Users>{

    return this.http.put<Users>(this._URL+"/"+id, data).pipe(catchError(this.errorHandler));
  }

  deleteUser (id:string) {

    return this.http.delete(this._URL+"/"+id);
  }




  errorHandler(error: HttpErrorResponse){

      return throwError(error.message || "Server Error");

  }
}
