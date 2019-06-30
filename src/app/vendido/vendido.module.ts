import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VendidoComponent , NgbdSortableHeader } from './vendido.component';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { Component} from '@angular/core';

const ROUTES: Routes = [
    { path: '', component: VendidoComponent }
];

@NgModule({
    declarations: [VendidoComponent,NgbdSortableHeader],
    exports: [VendidoComponent],
    bootstrap: [VendidoComponent],
    imports: [NgbModule,FormsModule,ReactiveFormsModule,CommonModule,RouterModule.forChild(ROUTES)]
})
export class VendidoModule {}
