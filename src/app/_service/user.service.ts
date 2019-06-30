import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

interface Usuario {
  Correo: string;
  Nombres: string;
  ApellidoPaterno: string;
  ApellidoMaterno : string,
  Direccion : string,
  Numero : string,
}

@Injectable()

export class dbUserService {

  private url: string = `${HOST}`;
  public user_id : string ;

  constructor(private http: HttpClient) { }

  getUser(){
    return this.user_id;
  }
  setUser(id:string){
    this.user_id = id;
  }
  listar() {
    return this.http.get<any[]>(`${this.url}/usuarios/`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  validarExistencia(correo : string,clave : string) {
    let user = {Correo:correo,Clave:clave};
    return this.http.post<Usuario[]>(`${this.url}/usuarios/validar/`,user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
