import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}${path}`,
      { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  postform(path: string, body: FormData): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }
  putform(path: string, body: FormData): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }
  postSoap(path: string, body: any): Observable<any> {

    const headers = new HttpHeaders()
            .set("Content-Type", "text/xml");
    return this.http.post(
      `${path}`, body, {...headers}
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: any): Observable<any> {

    return this.http.delete(
      `${environment.apiUrl}${path}`,

    ).pipe(catchError(this.formatErrors));
  }
  deletePromise(path: any): Promise<any> {

    return this.http.delete(
      `${environment.apiUrl}${path}`,

    ).toPromise();
  }
  private formatErrors(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.msg}`);
    }
    // return an observable with a user-facing error message
    return throwError({ msg: error.error.msg, status: error.error.status, code: error.status });
    // return error;
  };
}
