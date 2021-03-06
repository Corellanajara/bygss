import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()

export class ProductoService {

  private url: string = `${HOST}`;

  constructor(private http: HttpClient) { }


  listar(user_id:string) {
    return this.http.get<any[]>(`${this.url}/productos/${user_id}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  listarPorEstado(estado : number,user_id:string) {
    return this.http.get<any[]>(`${this.url}/productos/estado/${estado}/${user_id}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  insertar(producto : any,user_id:string){
    return this.http.post<any[]>(`${this.url}/productos/${user_id}`, producto ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  actualizar(id:string,producto : any,user_id:string){
    return this.http.put<any[]>(`${this.url}/productos/${id}/${user_id}`, producto ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  borrar(id:string,user_id : string){
    return this.http.delete<any[]>(`${this.url}/productos/${id}/${user_id}` ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
