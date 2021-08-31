import { Injectable } from '@angular/core';
import { Cuestionario } from '../models/cuestionario';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RespuestaCuestionario } from '../models/respuestaCuestionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestaCuestionarioService {

  myAppUrl: string;
  miApiUrl: string;


  nombreParticipante!: string;
  idCuestionario!: number;
  respuestas: number[] = [];
  cuestionario!: Cuestionario;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.miApiUrl = '/api/RespuestaCuestionario/';
  }

  guardarRespuestaCuestionario(respuestaCuestionario: RespuestaCuestionario): Observable<any> {
    return this.http.post(this.myAppUrl + this.miApiUrl, respuestaCuestionario)
  }

  getListCuestionarioRespuesta(idCuestionario: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.miApiUrl + idCuestionario)
  }

  eliminarRespuestaCuestionario(idRespuestaCuestionario: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.miApiUrl + idRespuestaCuestionario)
  }

  getCuestionarioByIdRespuesta(idRespuesta: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.miApiUrl + 'GetCuestionarioByIdRespuesta/' + idRespuesta);
  }
}



