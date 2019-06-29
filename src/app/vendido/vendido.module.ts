import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VendidoComponent } from './vendido.component';
//import { Component} from '@angular/core';

const ROUTES: Routes = [
    { path: '', component: VendidoComponent }
];

@NgModule({
    declarations: [VendidoComponent],
    imports: [CommonModule,RouterModule.forChild(ROUTES)]
})
export class VendidoModule {}
