import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  myAppUrl: string;
  miApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.miApiUrl = '/api/Login';
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(this.myAppUrl + this.miApiUrl, usuario);
  }
  setLocalStorage(data: string): void {
    localStorage.setItem('token', data);
  }

  /* getNombreUsuario(): string {
    return localStorage.getItem('nombreUsuario')!;
  } */

  getTokenDecoded(): any {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token')!);
    return decodedToken;
  }

  removeLocalStorage(): void {
    localStorage.removeItem('token');
  }
}
