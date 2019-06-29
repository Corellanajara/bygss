import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()

export class CausasService {

  private url: string = `${HOST}`;

  constructor(private http: HttpClient) { }

  listar(materia : string) {
    return this.http.get<any[]>(`${this.url}/causas/materia/${materia}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  insertar(causa : any){
    return this.http.post<any[]>(`${this.url}/causas/`, causa ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
