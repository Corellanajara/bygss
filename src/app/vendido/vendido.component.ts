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
  personaSeleccionada = {nombres :'',apellido_p:'',apellido_m:''}
  productoSeleccionado  = {_id:'',Persona :{},PrecioCosto:0,Talla:'',Proveedor:'',FechaPago:'','FechaIngreso':'','Color':'','Nombre' : '','Codigo' : '',Cantidad : 0,'PrecioVenta' : '','Estado' : ''};
  ProductosOriginal : any;
  personaFormulario : FormGroup;
  user_id : string;

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

    this.personaFormulario = this.formBuilder.group({
      'nombres' : [null, Validators.required],
      'apellido_p' : [null, Validators.required],
      'apellido_m' : [null, Validators.required],
    });

    let enVendido = 3;
    let enPendientes = 4;
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.user_id = usuario._id;
    productoService.listarPorEstado(enVendido,this.user_id).subscribe(productos=>{
      console.log(productos);
      for(let i = 0 ; i < productos.length;i++){
        this.sumaCostos += productos[i].PrecioCosto;
        this.sumaVentas += productos[i].PrecioVenta;
        this.sumaTotales += productos[i].Cantidad * productos[i].PrecioVenta;
      }
      this.Productos = productos;
      this.ProductosOriginal = productos;
    })
    productoService.listarPorEstado(enPendientes,this.user_id).subscribe(productos=>{
      console.log(productos);
      for(let i = 0 ; i < productos.length;i++){
        this.Productos.push(productos[i]);
        this.ProductosOriginal.push(productos[i]);
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
  public productoActualizar(producto){
    this.productoSeleccionado = producto;
    this.personaSeleccionada = producto.Persona[0];
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
