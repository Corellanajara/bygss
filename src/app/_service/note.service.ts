import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()

export class NotasService {

  private url: string = `${HOST}`;

  constructor(private http: HttpClient) { }


  listar(user_id:string) {
    return this.http.get<any[]>(`${this.url}/notas/${user_id}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  insertar(nota : any,user_id:string){
    return this.http.post<any[]>(`${this.url}/notas/${user_id}`, nota ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  actualizar(id:string,nota : any,user_id:string){
    return this.http.put<any[]>(`${this.url}/notas/${id}/${user_id}`, nota ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  borrar(id:string){
    return this.http.delete<any[]>(`${this.url}/notas/${id}` ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
