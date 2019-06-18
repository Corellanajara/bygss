import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService , Message , MessagesService , UserService , User } from 'ngx-admin-lte';
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';

interface Materia {
  id?: number;
  name: string;
  code : string;
}

@Component({
  selector: 'app-estudio-sucursal',
  templateUrl: './estudio-sucursal.component.html',
  styleUrls: ['./estudio-sucursal.component.css']
})
export class EstudiosucursalComponent implements OnInit, OnDestroy {

  Materias : Materia[]= [
    {id:1,name:'Civil Contencion',code:'CC'},
    {id:2,name:'Civil incontinencia',code:'CNC'},
    {id:3,name:'Constitucional',code:'C'},
    {id:3,name:'Extrajudicial',code:'E'},
    {id:4,name:'Familia',code:'F'},
    {id:3,name:'Laboral',code:'L'},
    {id:3,name:'Penal',code:'P'},
    {id:3,name:'Policia',code:'PL'},
    {id:3,name:'Otra',code:'O'},
  ]
  public date: Date = new Date();
  public id = 0;
  private sub: any;

  constructor(
    private msgServ: MessagesService,
    private route :ActivatedRoute,
    private router : Router,
    private breadServ: BreadcrumbService

  ) {

  }

  public ngOnInit() {
    // setttings the header for the home
    const idkey = 'id';
    this.sub = this.route.params
    .subscribe((data) => {
      this.id = data[idkey];
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
          }
        ]
      });
    });
  }
  public abrirmateria(materia : Materia){
    let params: NavigationExtras = {
      queryParams: { sucursal:this.id,code:materia.code},
      fragment: 'anchor'
    };

    this.router.navigate( ['/sucursal-materia/'+this.id+'/'+materia.code] , params );
  }
  public ngOnDestroy() {
    this.sub.unsubscribe();
    this.breadServ.clear();
    this.route = null;
  }
}
