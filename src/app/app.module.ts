import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';

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
//import { EstudioJuridicoComponent } from './estudio-juridico/estudio-juridico.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuWidgetComponent,
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
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    MenuWidgetComponent,
    HeaderWidgetComponent
  ]
})
export class AppModule { }
