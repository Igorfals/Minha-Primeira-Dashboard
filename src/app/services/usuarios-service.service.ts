import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {
  httpOptions: any = {
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
  alterar(credentials: any, id: number) {
    
    
    return new Promise((resolve) => {
      this.http.put(`${environment.baseurl}/user/${id}`, credentials, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          resolve(err);
        });
    });
  }
  getUsuarios() {
    const token: any = sessionStorage.getItem('token')
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'x-access-token': JSON.parse(token)
      }),
    };
    return new Promise((resolve) => {
      this.http.get(`${environment.baseurl}/users`, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          resolve(err);
        });
    });
  }
  apagar(id: number) {
    const token: any = sessionStorage.getItem('token')
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'x-access-token': JSON.parse(token)
      }),
    };
    
    return new Promise((resolve) => {
      this.http.delete(`${environment.baseurl}/user/${id}`, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          resolve(err);
        });
    });
  }
}