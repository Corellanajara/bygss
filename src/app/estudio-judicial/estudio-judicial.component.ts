import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService , Message , MessagesService , UserService , User } from 'ngx-admin-lte';
import { Router } from '@angular/router';

interface Sucursal {
  id?: number;
  name: string;
  code : string;
}


@Component({
  selector: 'app-estudio-judicial',
  templateUrl: './estudio-judicial.component.html',
  styleUrls: ['./estudio-judicial.component.css']
})
export class EstudioJudicialComponent implements OnInit, OnDestroy {

  Sucursales : Sucursal[]= [
    {id:1,name:'Talca',code:'TLC'},
    {id:2,name:'Linares',code:'LNR'},
    {id:3,name:'Constitucion',code:'CTT'},
    {id:4,name:'Curicó',code:'CCO'},
  ]
  // TODO: TRAER DESDE LA BD
  public date: Date = new Date();


  constructor(
    private msgServ: MessagesService,
    private router : Router,
    private breadServ: BreadcrumbService
  ) {

  }

  public ngOnInit() {
    // setttings the header for the home
    this.breadServ.setCurrent({
      description: 'principal',
      display: true,
      header: 'Estudio Juridico',
      levels: [
        {
          icon: 'dashboard',
          link: ['/'],
          title: 'Inicio'
        },
        {
          icon: 'clock-o',
          link: ['/estudio-judicial/'],
          title: 'Estudio Judicial '
        }
      ]
    });

  }
  public abrirSucursal(sucursal){
    this.router.navigate( ['estudio-sucursal/'+sucursal.name] );
  }
  public ngOnDestroy() {
    // removing the header
    this.breadServ.clear();
  }
}
