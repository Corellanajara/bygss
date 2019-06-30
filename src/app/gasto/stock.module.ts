import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockComponent , NgbdSortableHeader } from './stock.component';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const ROUTES: Routes = [
    { path: '', component: StockComponent }
];

@NgModule({

    declarations: [StockComponent, NgbdSortableHeader],
    exports: [StockComponent],
    bootstrap: [StockComponent],
    imports: [NgbModule,FormsModule,ReactiveFormsModule,CommonModule,RouterModule.forChild(ROUTES)]
})
export class StockModule {}
