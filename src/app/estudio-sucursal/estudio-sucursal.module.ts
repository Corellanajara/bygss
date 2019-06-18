import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstudiosucursalComponent } from './estudio-sucursal.component';
//import { Component} from '@angular/core';

const ROUTES: Routes = [
    { path: '', component: EstudiosucursalComponent }
];

@NgModule({
    declarations: [EstudiosucursalComponent],
    imports: [CommonModule,RouterModule.forChild(ROUTES)]
})
export class EstudiosucursalModule {}
