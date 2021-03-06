import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PedidoComponent , NgbdSortableHeader } from './pedido.component';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { Component} from '@angular/core';

const ROUTES: Routes = [
    { path: '', component: PedidoComponent }
];

@NgModule({
    declarations: [PedidoComponent , NgbdSortableHeader],
    exports: [PedidoComponent],
    bootstrap: [PedidoComponent],
    imports: [NgbModule,FormsModule,ReactiveFormsModule,CommonModule,RouterModule.forChild(ROUTES)]
})
export class PedidoModule {}
