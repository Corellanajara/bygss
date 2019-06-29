import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService , Message , MessagesService , UserService , User } from 'ngx-admin-lte';
import { Router } from '@angular/router';
import { ProductoService } from '../_service/product.service';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
//import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  providers: [ ProductoService ]
})
export class AgregarComponent implements OnInit, OnDestroy {

  public fechaHoy = new Date();
  public idUser = 1;
  public date: Date = new Date();
  productoFormulario : FormGroup;

  constructor(
    private productoService : ProductoService,
    private msgServ: MessagesService,
    private router : Router,
    private formBuilder: FormBuilder,
    private breadServ: BreadcrumbService
  ) {

    this.productoFormulario = this.formBuilder.group({
      'Nombre' : [null, Validators.required],
      'Codigo' : [null, Validators.required],
      'Talla' : [null, Validators.required],
      'Proveedor' : [null, Validators.required],
      'Cantidad' : [null, Validators.required],
      'PrecioCosto' : [null, Validators.required],
      'PrecioVenta' : [null, Validators.required],
      'FechaIngreso' : [null, Validators.required]
    })
  }

  public ngOnInit() {
    this.breadServ.setCurrent({
      description: 'productos',
      display: true,
      header: 'Agregar',
      levels: [
        {
          icon: 'dashboard',
          link: ['/'],
          title: 'Inicio'
        },
        {
          icon: 'clock-o',
          link: ['/agregar/'],
          title: 'Agregar '
        }
      ]
    });

  }


  public addVenta(){

    let enagregar = 1;
    let pFormulario = this.productoFormulario.value;
    let producto = {
      'Nombre' : pFormulario.Nombre,
      'Codigo' : pFormulario.Codigo,
      'Talla' : pFormulario.Talla,
      'Proveedor' : pFormulario.Proveedor,
      'Cantidad' : pFormulario.Cantidad,
      'PrecioCosto' : pFormulario.PrecioCosto,
      'PrecioVenta' : pFormulario.PrecioVenta,
      'FechaIngreso' : pFormulario.FechaIngreso,
      'Estado' : enagregar,
    }
    this.productoService.insertar(producto).subscribe(res=>{
      console.log(res);
      this.router.navigate( ['stock'] );
    });


  }
  public ngOnDestroy() {
    this.breadServ.clear();
  }
}
