import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()

export class MateriaSucursalService {

  private url: string = `${HOST}`;

  constructor(private http: HttpClient) { }

  listar(sucursal : string) {
    return this.http.get<any[]>(`${this.url}/sucursal/${sucursal}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  listarByCausa(sucursal : string){
    return this.http.get<any[]>(`${this.url}/causa/materias/${sucursal}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

}
