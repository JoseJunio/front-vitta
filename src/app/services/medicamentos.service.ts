import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Medicamentos } from '../models/medicamentos';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  url = 'http://localhost:3000/medicamentos';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient:HttpClient) { }

  getMedicamentos(): Observable<Medicamentos[]>{
    return this.httpClient.get<Medicamentos[]>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  getMedicamentoById(id: number): Observable<Medicamentos> {
    return this.httpClient.get<Medicamentos>(this.url + '/' + id)
      .pipe(
        retry(2),
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
