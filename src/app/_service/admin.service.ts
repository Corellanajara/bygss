import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()

export class AdminService {

  private url: string = `${HOST}`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(`${this.url}/productos/`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  listarPorEstado(estado : number) {
    return this.http.get<any[]>(`${this.url}/productos/estado/${estado}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  insertar(producto : any){
    return this.http.post<any[]>(`${this.url}/productos/`, producto ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  actualizar(id:string,producto : any){
    return this.http.put<any[]>(`${this.url}/productos/${id}`, producto ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  borrar(id:string){
    return this.http.delete<any[]>(`${this.url}/productos/${id}` ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
