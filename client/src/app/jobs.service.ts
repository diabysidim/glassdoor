import { Injectable } from '@angular/core';

import {Observable, throwError} from 'rxjs';


import {catchError} from 'rxjs/operators';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Jobs } from "./Jobs";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  
  private _URL= "http://localhost:3000/jobs";
  private _URL2 = "http://localhost:3000/companies"
  constructor(private http: HttpClient) { }

  fetchJobs(id?): Observable<Jobs[]>{

    return this.http.get<Jobs []>(this._URL+"?name="+id).pipe(catchError(this.errorHandler));
  }

  fetchJobsByCompanyId(id): Observable<Jobs[]>{

    return this.http.get<Jobs []>(this._URL2+"/"+ id +"/jobs").pipe(catchError(this.errorHandler));
  }

  postJob(data): Observable<Jobs[]>{

    return this.http.post<Jobs []>(this._URL, data).pipe(catchError(this.errorHandler));
  }

  updateJob(id:string, data) : Observable<Jobs[]>{

    return this.http.put<Jobs []>(this._URL+"/"+id, data).pipe(catchError(this.errorHandler));
  }

  deleteJob (id:string) {

    return this.http.delete(this._URL+"/"+id);
  }




  errorHandler(error: HttpErrorResponse){

      return throwError(error.message || "Server Error");

  }
}
