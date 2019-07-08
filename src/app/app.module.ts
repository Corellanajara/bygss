import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';
//services
import { dbUserService } from './_service/user.service';
import { ProductoService } from './_service/product.service';
import { NotasService } from './_service/note.service';

// modules
import { NgxAdminLteModule } from 'ngx-admin-lte';

// les pages
import { LoginComponent } from './login/login.component';

// ng bootstrap module
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// main bootstrap
import { routing } from './app.routes';
import { MenuWidgetComponent } from './widgets/menu-widget/menu-widget.component';
import { HeaderWidgetComponent } from './widgets/header-widget/header-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    //MenuWidgetComponent,
    HeaderWidgetComponent,
    //EstudioJuridicoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HttpModule,
    NgxAdminLteModule,
    routing
  ],
  providers: [NotasService,dbUserService,ProductoService],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    //MenuWidgetComponent,
    HeaderWidgetComponent
  ]
})
export class AppModule { }
