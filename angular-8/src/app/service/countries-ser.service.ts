import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CountriesSerService {

   baseUrl = environment.baseUrl;;
  constructor(private https: HttpClient) { }
  
  public getMultipleCountries(): Observable<any>{
  return this.https.get<any>(this.baseUrl).pipe(
    catchError((error) => {
      return throwError({
        status: error.status,
        error: { message: error.message },
      });
    })
  );
}
}
