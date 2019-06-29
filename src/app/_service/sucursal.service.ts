import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()

export class SucursalService {

  private url: string = `${HOST}`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(`${this.url}/sucursales`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  buscarContenidoCursoById(id:number){
    return this.http.get<any[]>(`${this.url}/sucursales/${id}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

}
