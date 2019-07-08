import { Component, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { NotasService } from '../../_service/note.service';

@Component({
  selector: 'app-header-widget',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header-widget.component.html'
})
export class HeaderWidgetComponent implements OnInit, OnChanges {
  public label = '';
  public estado = false;
  public add = false;
  public titulo = '';
  public contenido = '';
  public usuario : any;
  public notas = [];
  constructor(private nService : NotasService ) { }

  ngOnInit() {
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.usuario = usuario;
    this.nService.listar(usuario._id).subscribe( notas =>{
      this.notas = notas;
    })


  }

  ngOnChanges() {
  }
  public addNota(){
    let nota  = {titulo : this.titulo, contenido : this.contenido};
    this.nService.insertar(nota,this.usuario._id).subscribe( nota=>{
      this.notas.push(nota);
      this.titulo = '';
      this.contenido = '';
    })
  }
  public eliminar(nota){
    this.nService.borrar(nota._id).subscribe( result => {
      console.log("result",result);
      this.ngOnInit();
    })
  }
  public clic(){
    this.estado = !this.estado;
  }

}
