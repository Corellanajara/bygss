import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService , Message , MessagesService , UserService , User } from 'ngx-admin-lte';
import { Router } from '@angular/router';
import { ProductoService } from '../_service/product.service';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';

interface Producto {
  Codigo: string;
  Talla: string;
  Nombre : string;
}

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [ ProductoService ]
})
export class PedidoComponent implements OnInit, OnDestroy {

  public idUser = 1;
  sumaCostos = 0;
  sumaVentas = 0;
  sumaTotales = 0;
  Productos : Producto[];
  productoFormulario : FormGroup;
  personaFormulario : FormGroup;

  public date: Date = new Date();


  constructor(
    private productoService : ProductoService,
    private msgServ: MessagesService,
    private router : Router,
    private formBuilder: FormBuilder,
    private breadServ: BreadcrumbService
  ) {
    this.refrescarData();
    this.productoFormulario = this.formBuilder.group({
      'Nombre' : [null, Validators.required],
      'Codigo' : [null, Validators.required],
      'Color' : [null, Validators.required],
      'Talla' : [null, Validators.required],
      'Proveedor' : [null, Validators.required],
      'Cantidad' : [null, Validators.required],
      'FechaPago' : [null,Validators.required],
      'PrecioCosto' : [null, Validators.required],
      'PrecioVenta' : [null, Validators.required]
    })
    this.personaFormulario = this.formBuilder.group({
      'nombres' : [null, Validators.required],
      'apellido_p' : [null, Validators.required],
      'apellido_m' : [null, Validators.required],
    });
  }
  public refrescarData(){
    let enPedido = 2;
    this.productoService.listarPorEstado(enPedido).subscribe(productos=>{
      console.log(productos);
      for(let i = 0 ; i < productos.length;i++){
        this.sumaCostos += productos[i].PrecioCosto;
        this.sumaVentas += productos[i].PrecioVenta;
        this.sumaTotales += productos[i].Cantidad * productos[i].PrecioVenta;
      }
      this.Productos = productos;
    });
  }
  public ngOnInit() {
    // setttings the header for the home
    this.breadServ.setCurrent({
      description: 'de productos',
      display: true,
      header: 'Pedido',
      levels: [
        {
          icon: 'dashboard',
          link: ['/'],
          title: 'Inicio'
        },
        {
          icon: 'clock-o',
          link: ['/pedido/'],
          title: 'Pedido '
        }
      ]
    });

  }
  public ver(producto){
    //this.router.navigate( ['estudio-sucursal/'+sucursal.title] );
    console.log(producto);
  }
  public ngOnDestroy() {
    // removing the header
    this.breadServ.clear();
  }
  public addVenta(){
    let pFormulario = this.productoFormulario.value;
    let estadoPendiente = 2;
    let producto = {
      'Nombre' : pFormulario.Nombre,
      'Cantidad':  pFormulario.Cantidad ,
      'Codigo': pFormulario.Codigo,
      'Color': pFormulario.Color,
      'Estado': estadoPendiente,
      'FechaPago': pFormulario.FechaPago,
      'Persona': this.personaFormulario.value,
      'PrecioCosto' : pFormulario.PrecioCosto,
      'PrecioVenta': pFormulario.PrecioVenta,
      'Proveedor' : pFormulario.Proveedor,
      'Talla': pFormulario.Talla
    }
    this.productoService.insertar(producto).subscribe(res=>{
      console.log(res);
      this.refrescarData();
    });
  }
}
