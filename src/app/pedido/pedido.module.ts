import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PedidoComponent } from './pedido.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { Component} from '@angular/core';

const ROUTES: Routes = [
    { path: '', component: PedidoComponent }
];

@NgModule({
    declarations: [PedidoComponent],
    imports: [ReactiveFormsModule,CommonModule,RouterModule.forChild(ROUTES)]
})
export class PedidoModule {}
