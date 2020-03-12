import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  url = 'http://localhost:3000/medicos'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient:HttpClient) { }

  getMedico(): Observable<Medico[]> {
    return this.httpClient.get<Medico[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getMedicoById(id: number): Observable<Medico> {
    return this.httpClient.get<Medico>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveMedico(medico: Medico): Observable<Medico> {
    return this.httpClient.post<Medico>(this.url, JSON.stringify(medico), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateMedico(medico: Medico): Observable<Medico> {
    return this.httpClient.put<Medico>(this.url + '/' + medico.id, JSON.stringify(medico), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteMedico(medico: Medico) {
    return this.httpClient.delete<Medico>(this.url + '/' + medico.id, this.httpOptions)
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
