import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cuestionario } from '../models/cuestionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  tituloCuestionario!: string;
  descripcionCuestionario!: string;
  myAppUrl: string;
  miApiUrl: string;

  constructor(private http: HttpClient) {


    this.myAppUrl = environment.endpoint;
    this.miApiUrl = '/api/Cuestionario';
  }

  guardarCuestionario(cuestionario: Cuestionario): Observable<any> {
    return this.http.post(this.myAppUrl + this.miApiUrl, cuestionario)
  }
}
