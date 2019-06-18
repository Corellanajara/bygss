import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SucursalMateriaComponent } from './sucursal-materia.component';
//import { Component} from '@angular/core';

const ROUTES: Routes = [
    { path: '', component: SucursalMateriaComponent }
];

@NgModule({
    declarations: [SucursalMateriaComponent],
    imports: [CommonModule,RouterModule.forChild(ROUTES)]
})
export class SucursalMateriaModule {}
