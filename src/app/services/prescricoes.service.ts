import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Prescricoes } from '../models/prescricoes';

@Injectable({
  providedIn: 'root'
})
export class PrescricoesService {

  url = 'http://localhost:3000/prescricoes';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient:HttpClient) { }

  getPrescricoes(): Observable<Prescricoes[]>{
    return this.httpClient.get<Prescricoes[]>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  savePrescricao(prescricao: Prescricoes): Observable<Prescricoes> {
    return this.httpClient.post<Prescricoes>(this.url, JSON.stringify(prescricao), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deletePrescricao(prescricao: Prescricoes) {
    return this.httpClient.delete<Prescricoes>(this.url + '/' + prescricao.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
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
