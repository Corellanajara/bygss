import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService , Message , MessagesService , User } from 'ngx-admin-lte';
import { ProductoService } from '../_service/product.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  providers: [ ProductoService ]
})
export class HomeComponent implements OnInit, OnDestroy {
  public date: Date = new Date();

  constructor(
    private productoService : ProductoService,
    private msgServ: MessagesService,
    private breadServ: BreadcrumbService
  ) {
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.user_id = usuario._id;
    this.refrescarDataStock();
    this.refrescarDataVendido();
    this.refrescarDataPendiente();
    this.refrescarDataPedido();
  }
  user_id : string;
  sumaVentasVendido = 0;
  sumaCostosVendido = 0;
  sumaTotalesVendido = 0;

  sumaVentasPedido = 0;
  sumaCostosPedido = 0;
  sumaTotalesPedido = 0;

  sumaVentasStock = 0;
  sumaCostosStock = 0;
  sumaTotalesStock = 0;

  sumaVentasPendiente = 0;
  sumaCostosPendiente = 0;
  sumaTotalesPendiente = 0;

  public ngOnInit() {
    // setttings the header for the home
    this.breadServ.setCurrent({
      description: 'HomePage',
      display: true,
      header: 'Dashboard',
      levels: [
        {
          icon: 'dashboard',
          link: ['/'],
          title: 'Home'
        }
      ]
    });

  }
  public refrescarDataPendiente(){
    let enPendiente = 4;
    this.productoService.listarPorEstado(enPendiente,this.user_id).subscribe(productos=>{

      for(let i = 0 ; i < productos.length;i++){
        this.sumaCostosPendiente += productos[i].PrecioCosto;
        this.sumaVentasPendiente += productos[i].PrecioVenta;
        this.sumaTotalesPendiente = this.sumaVentasPendiente - this.sumaCostosPendiente;
        console.log("pendientes de pago pero vendidos",productos[i]);
      }


    });
  }
  public refrescarDataVendido(){
    let enVendido = 3;

    this.productoService.listarPorEstado(enVendido,this.user_id).subscribe(productos=>{

      for(let i = 0 ; i < productos.length;i++){
        this.sumaCostosVendido += productos[i].Cantidad * productos[i].PrecioCosto;
        this.sumaVentasVendido += productos[i].Cantidad * productos[i].PrecioVenta;
        this.sumaTotalesVendido = this.sumaVentasVendido - this.sumaCostosVendido;
        console.log(" vendidos",productos[i]);
      }

    });
  }
  public refrescarDataStock(){
    let enStock = 1;
    this.productoService.listarPorEstado(enStock,this.user_id).subscribe(productos=>{

      for(let i = 0 ; i < productos.length;i++){
        this.sumaCostosStock += productos[i].Cantidad * productos[i].PrecioCosto;
        this.sumaVentasStock += productos[i].Cantidad * productos[i].PrecioVenta;
        this.sumaTotalesStock =  this.sumaVentasStock - this.sumaCostosStock ;
        console.log("en stock",productos[i]);
      }

    });
  }
  public refrescarDataPedido(){
    let enPedido = 2;
    this.productoService.listarPorEstado(enPedido,this.user_id).subscribe(productos=>{

      for(let i = 0 ; i < productos.length;i++){
        this.sumaCostosPedido += productos[i].Cantidad * productos[i].PrecioCosto;
        this.sumaVentasPedido += productos[i].Cantidad * productos[i].PrecioVenta;
        this.sumaTotalesPedido = this.sumaVentasPedido - this.sumaCostosPedido ;
        console.log("pedido",productos[i]);
      }

    });
  }

  public ngOnDestroy() {
    // removing the header
    this.breadServ.clear();
  }

}
