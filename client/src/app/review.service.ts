import { Injectable } from '@angular/core';

import {Observable, throwError} from 'rxjs';


import {catchError} from 'rxjs/operators';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Reviews } from "./Reviews";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  
  private _URL= "http://localhost:3000/Reviews";
  private _URL2 = "http://localhost:3000/companies"
  private _URL3 = "http://localhost:3000/users"


  constructor(private http: HttpClient) { }

  fetchReviews(): Observable<Reviews[]>{

    return this.http.get<Reviews []>(this._URL).pipe(catchError(this.errorHandler));
  }

  fetchReviewById(id:string): Observable<Reviews[]>{

    return this.http.get<Reviews []>(this._URL+"/"+id).pipe(catchError(this.errorHandler));
  }

  fetchReviewByCompanyId(id): Observable<Reviews[]>{

    return this.http.get<Reviews []>(this._URL2+"/"+ id +"/reviews").pipe(catchError(this.errorHandler));
  }

  fetchReviewByUserId(id): Observable<any[]>{

    console.log("finding nemo")

    return this.http.get<any[]>(this._URL3+"/"+ id +"/reviews").pipe(catchError(this.errorHandler));
  }
  

  postReview( data): Observable<Reviews>{

    return this.http.post<Reviews>(this._URL, data).pipe(catchError(this.errorHandler));
  }

  updateReview(id:string, data) : Observable<Reviews[]>{

    return this.http.put<Reviews []>(this._URL+"/"+id, data).pipe(catchError(this.errorHandler));
  }

  deleteReview (id:string) {

    return this.http.delete(this._URL+"/"+id);
  }




  errorHandler(error: HttpErrorResponse){

      return throwError(error.message || "Server Error");

  }
}
