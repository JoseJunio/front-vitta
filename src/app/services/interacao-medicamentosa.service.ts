import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { InteracaoMedicamentosa } from '../models/interacaoMedicamentosa';

@Injectable({
  providedIn: 'root'
})
export class InteracaoMedicamentosaService {

  url = 'http://localhost:3000/interacao_medicamentosa';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient:HttpClient) { }

  getInteracaoMedicamentosa(): Observable<InteracaoMedicamentosa[]>{
    return this.httpClient.get<InteracaoMedicamentosa[]>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
