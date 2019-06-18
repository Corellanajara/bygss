import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';

// modules
import { NgxAdminLteModule } from 'ngx-admin-lte';

// les pages
import { LoginComponent } from './login/login.component';

// ng bootstrap module
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// main bootstrap
import { routing } from './app.routes';
import { MenuWidgetComponent } from './widgets/menu-widget/menu-widget.component';
import { HeaderWidgetComponent } from './widgets/header-widget/header-widget.component';
//import { EstudioJudicialComponent } from './estudio-judicial/estudio-judicial.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuWidgetComponent,
    HeaderWidgetComponent,
    //EstudioJudicialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //NgbModule,
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
