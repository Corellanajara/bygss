import { OnInit, OnDestroy ,Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren ,ViewEncapsulation } from '@angular/core';
import { BreadcrumbService , Message , MessagesService , UserService , User } from 'ngx-admin-lte';
import { Router } from '@angular/router';
import { ProductoService } from '../_service/product.service';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [ ProductoService  ]
})
export class StockComponent implements OnInit, OnDestroy {
  user_id:string;
  model;
  sumCostos = 0;
  sumVentas = 0;
  filtro = "";
  public fechaHoy = new Date();
  public idUser = 1;
  public estado : any ;
  Productos : any;
  ProductosOriginal : any;
  productoSeleccionado  = {_id:'',Persona:{},PrecioCosto:0,Talla:'',Proveedor:'',FechaPago:'','FechaIngreso':'','Color':'','Nombre' : '','Codigo' : '',Cantidad : 0,'PrecioVenta' : '','Estado' : ''};
  productoVacio = {_id:'',Persona:{},PrecioCosto:0,Talla:'',Proveedor:'',FechaPago:'','FechaIngreso':'','Color':'','Nombre' : '','Codigo' : '',Cantidad : 0,'PrecioVenta' : '','Estado' : ''};
  public date: Date = new Date();
  productoFormulario : FormGroup;
  productoCompletoFormulario : FormGroup;
  personaFormulario : FormGroup;
  PrecioVenta : any;
  FechaPago : any;
  Cantidad : any;
  unidadesVendidas : number;
// los estados  =  1 = stock , 2 = pedido , 3 vendido , 4 pendiente pago
  Estados = [{valor:4,nombre:'Pendiente'},{valor:3,nombre:'Pagado'}];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  onSort({column, direction}: SortEvent) {


    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '') {
      this.Productos = this.ProductosOriginal;
    } else {
      this.Productos = [...this.ProductosOriginal].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  constructor(
    private productoService : ProductoService,
    private msgServ: MessagesService,
    private router : Router,
    private formBuilder: FormBuilder,
    private breadServ: BreadcrumbService
  ) {
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.user_id = usuario._id;
    this.refrescarData();
    this.personaFormulario = this.formBuilder.group({
      'nombres' : [null, Validators.required],
      'apellido_p' : [null, Validators.required],
      'apellido_m' : [null, Validators.required],
    });
    this.productoFormulario = this.formBuilder.group({
      'Nombre' : [null, Validators.required],
      'Codigo' : [null, Validators.required],
      'Cantidad' : [null, Validators.required],
      'PrecioCosto' : [null, Validators.required],
      'PrecioVenta' : [null, Validators.required],
      'Proveedor' : [null, Validators.required],
      'Color' : [null, Validators.required],
      'Talla' : [null, Validators.required],
      'Estado' : [null, Validators.required],
      'FechaPago' : [null,Validators.minLength(4)]
    });
    this.productoCompletoFormulario = this.formBuilder.group({
      'Nombre' : [null, Validators.required],
      'Codigo' : [null, Validators.required],
      'Color' : [null, Validators.required],
      'Talla' : [null, Validators.required],
      'Proveedor' : [null, Validators.required],
      'Cantidad' : [null, Validators.required],
      'FechaPago' : [null,Validators.required],
      'PrecioCosto' : [null, Validators.required],
      'PrecioVenta' : [null, Validators.required]
    });
  }

  filtrar(){
    console.log("this filtro : ",this.filtro);
    this.Productos = this.ProductosOriginal.filter( producto => this.filtros(producto,this.filtro) );
  }
  filtros(producto,filtro){
    if(this.filtro == ""){
      console.log("el filtro esta vacio");
      this.refrescarData();
      return true;
    }
    if(producto.Nombre == filtro){
      return true;
    }
    if(producto.Codigo == filtro){
      return true;
    }
    if(producto.Talla == filtro){
      return true;
    }
    if(producto.Proveedor == filtro){
      return true;
    }
    if(producto.PrecioCosto == filtro){
      return true;
    }
    if(producto.PrecioVenta == filtro){
      return true;
    }
    return false;
  }
  public refrescarData(){
    let enStock = 1;
    let self = this;
    self.sumCostos = 0;
    self.sumVentas = 0;
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.productoService.listarPorEstado(enStock,usuario._id).subscribe(productos=>{
      console.log(productos);
      for(let i = 0 ; i < productos.length; i++){
          self.sumCostos += parseInt(productos[i].PrecioCosto);
          self.sumVentas += parseInt(productos[i].PrecioVenta);
      }
      this.Productos = productos;
      this.ProductosOriginal = productos;
    });
  }
  public ngOnInit() {
    this.breadServ.setCurrent({
      description: 'de productos',
      display: true,
      header: 'Stock',
      levels: [
        {
          icon: 'dashboard',
          link: ['/'],
          title: 'Inicio'
        },
        {
          icon: 'clock-o',
          link: ['/stock/'],
          title: 'Stock '
        }
      ]
    });

  }
  public productoActual(producto){
    this.productoSeleccionado = producto;
    this.productoFormulario.controls['PrecioVenta'] = producto.PrecioVenta;
    this.productoFormulario.controls['Nombre'] = producto.Nombre;
    this.productoFormulario.controls['Codigo'] = producto.Codigo;
  }
  public productoActualizar(producto){

    this.productoSeleccionado = producto;
    this.productoCompletoFormulario.controls['Proveedor'] = producto.Proveedor;
    this.productoCompletoFormulario.controls['Nombre'] = producto.Nombre;
    this.productoCompletoFormulario.controls['Codigo'] = producto.Codigo;
    this.productoCompletoFormulario.controls['Color'] = producto.Color;
    this.productoCompletoFormulario.controls['Talla'] = producto.Talla;
    this.productoCompletoFormulario.controls['Cantidad'] = producto.Cantidad;
    this.productoCompletoFormulario.controls['FechaPago'] = producto.FechaPago;
    this.productoCompletoFormulario.controls['PrecioCosto'] = producto.PrecioCosto;
    this.productoCompletoFormulario.controls['PrecioVenta'] = producto.PrecioVenta;
  }
  public ver(producto){
    console.log(producto);
  }
  public counter(numero : number) {
    let datos = [];
    for(let i = 0 ; i < numero ; i++ ){
      datos.push( (i+1) );
    }
    return datos;
  }

  public addVenta(){
    this.productoSeleccionado.FechaIngreso = this.convertirDate(this.productoSeleccionado.FechaIngreso);
    let producto = this.productoSeleccionado;
    let cantidad = producto.Cantidad - this.unidadesVendidas;
    if(cantidad > 0 ){
      producto.Estado = "1";
      producto.Cantidad = cantidad;
      this.productoService.actualizar(producto._id,producto,this.user_id).subscribe( p =>{
        console.log("actualizado",p);
        this.refrescarData();
      })
    }else{
      this.productoService.borrar(producto._id,this.user_id).subscribe( p =>{
        console.log("ya no quedan",p);
        this.refrescarData();
      })
    }
    producto.Estado = "3";
    producto.Cantidad = this.unidadesVendidas;
    producto.Persona = this.personaFormulario.value;
    this.productoService.insertar(producto,this.user_id).subscribe ( p =>{
      console.log("producto vendido",producto);
      console.log("producto retornado",p);
      console.log("producto insertado en vendidos");

      this.refrescarData();
    })

  }
  public actualizarProducto(){
    console.log("prod selec",this.productoSeleccionado);
    let date = this.convertirDate(this.productoSeleccionado.FechaIngreso);
    this.productoSeleccionado.FechaIngreso = date;
    this.productoService.actualizar(this.productoSeleccionado._id,this.productoSeleccionado,this.user_id).subscribe( producto =>{
      console.log("actualizado",producto);
    });
  }
  public convertirDate(fecha){
    return fecha.day + "-" +fecha.month+"-"+fecha.year;
  }
  public addProducto(){
    this.productoSeleccionado.FechaIngreso = this.convertirDate(this.productoSeleccionado.FechaIngreso);
    let producto = this.productoSeleccionado;
    producto.Estado = "1";
    this.productoService.insertar(producto,this.user_id).subscribe( producto =>{
      console.log("se inserto",producto);
      this.refrescarData();
      this.productoSeleccionado = this.productoVacio;
    });

  }
  public vaciarProductoActual(){
    this.productoSeleccionado = this.productoVacio;
  }
  public eliminar(){
    let self = this;
    this.productoService.borrar(this.productoSeleccionado._id,this.user_id).subscribe( producto => {
      console.log("se elimino ", producto);
      self.productoSeleccionado = self.productoVacio;
      self.refrescarData();
    });
  }
  public ngOnDestroy() {
    this.breadServ.clear();
  }
}
