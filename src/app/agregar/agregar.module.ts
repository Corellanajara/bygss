import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './agregar.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { Component} from '@angular/core';

const ROUTES: Routes = [
    { path: '', component: AgregarComponent }
];

@NgModule({
    declarations: [AgregarComponent],
    imports: [ReactiveFormsModule,CommonModule,RouterModule.forChild(ROUTES)]
})
export class AgregarModule {}
