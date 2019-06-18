import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService , Message , MessagesService , UserService , User } from 'ngx-admin-lte';
import { Router, ActivatedRoute } from '@angular/router';

interface Materia {
  id?: number;
  name: string;
  code : string;
}

@Component({
  selector: 'app-sucursal-materia',
  templateUrl: './sucursal-materia.component.html',
  styleUrls: ['./sucursal-materia.component.css']
})
export class SucursalMateriaComponent implements OnInit, OnDestroy {

  public date: Date = new Date();
  public id : any;
  private sub: any;
  private code : any;
  constructor(
    private msgServ: MessagesService,
    private route :ActivatedRoute,
    private breadServ: BreadcrumbService

  ) {

  }

  public ngOnInit() {
    // setttings the header for the home

    this.id = this.route.snapshot.paramMap.get("sucursal");
    this.code = this.route.snapshot.paramMap.get("code");
        
    this.breadServ.setCurrent({
      description: this.id,
      display: true,
      header: 'Estudio Juridico',
      levels: [
        {
          icon: 'dashboard',
          link: ['/'],
          title: 'Inicio'
        },
        {
          icon: 'book',
          link: ['/estudio-judicial/'],
          title: 'Estudio Judicial '
        },
        {
          icon: 'book',
          link: ['/estudio-sucursal/'+this.id],
          title: 'Sucursal ' + this.id
        },
        {
          icon: 'book',
          title: 'Materia  ' + this.code
        }
      ]
    })

  }

  public ngOnDestroy() {
    this.breadServ.clear();
    this.route = null;
  }
}
