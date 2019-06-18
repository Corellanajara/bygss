import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstudioJudicialComponent } from './estudio-judicial.component';
//import { Component} from '@angular/core';

const ROUTES: Routes = [
    { path: '', component: EstudioJudicialComponent }
];

@NgModule({
    declarations: [EstudioJudicialComponent],
    imports: [CommonModule,RouterModule.forChild(ROUTES)]
})
export class EstudioJudicialModule {}
