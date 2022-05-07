import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  };
  constructor(private http: HttpClient) {

  }
  cadastrar(credentials: any) {
    return new Promise((resolve) => {
      this.http.post(`${environment.baseurl}/user`, credentials, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          resolve(err);
        });
    });
  }
  getUsuarios() {
    return new Promise((resolve) => {
      this.http.get(`${environment.baseurl}/users`, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          resolve(err);
        });
    });
  }
}