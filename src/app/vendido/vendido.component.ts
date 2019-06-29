import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService , Message , MessagesService , UserService , User } from 'ngx-admin-lte';
import { Router } from '@angular/router';
import { ProductoService } from '../_service/product.service';


interface Producto {
  Codigo: string;
  Talla: string;
  Nombre : string;
}

@Component({
  selector: 'app-vendido',
  templateUrl: './vendido.component.html',
  styleUrls: ['./vendido.component.css'],
  providers: [ ProductoService ]
})
export class VendidoComponent implements OnInit, OnDestroy {

  public idUser = 1;

  Productos : Producto[];

  public date: Date = new Date();

  sumaCostos = 0;
  sumaVentas = 0;
  sumaTotales = 0;
  constructor(
    private productoService : ProductoService,
    private msgServ: MessagesService,
    private router : Router,
    private breadServ: BreadcrumbService
  ) {
    let enVendido = 3;
    let enPendientes = 4;
    productoService.listarPorEstado(enVendido).subscribe(productos=>{
      console.log(productos);
      for(let i = 0 ; i < productos.length;i++){        
        this.sumaCostos += productos[i].PrecioCosto;
        this.sumaVentas += productos[i].PrecioVenta;
        this.sumaTotales += productos[i].Cantidad * productos[i].PrecioVenta;
      }
      this.Productos = productos;
    })
    productoService.listarPorEstado(enPendientes).subscribe(productos=>{
      console.log(productos);
      for(let i = 0 ; i < productos.length;i++){
        this.Productos.push(productos[i]);
        this.sumaCostos += productos[i].PrecioCosto;
        this.sumaVentas += productos[i].PrecioVenta;
        this.sumaTotales += productos[i].Cantidad * productos[i].PrecioVenta;
        console.log(productos[i].Cantidad * productos[i].PrecioVenta);
      }
    })


  }

  public ngOnInit() {
    // setttings the header for the home
    this.breadServ.setCurrent({
      description: 'productos ya vendidos',
      display: true,
      header: 'Vendidos',
      levels: [
        {
          icon: 'dashboard',
          link: ['/'],
          title: 'Inicio'
        },
        {
          icon: 'clock-o',
          link: ['/vendido/'],
          title: 'Vendido '
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
}
