import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateGuard, LayoutAuthComponent, LayoutLoginComponent, LayoutRegisterComponent } from 'ngx-admin-lte';

import { LoginComponent } from './login/login.component';

// Components
import { AppComponent } from './app.component';
import { HeaderWidgetComponent } from './widgets/header-widget/header-widget.component';

const routes: Routes = [
  // logged routes
  {
    canActivate: [CanActivateGuard],
    children: [
      {
        canActivate: [CanActivateGuard],
        loadChildren: './home/home.module#HomeModule',
        path: ''
      },
      {
        canActivate: [CanActivateGuard],
        loadChildren: './home/home.module#HomeModule',
        path: 'home'
      },
    ],
    component: LayoutAuthComponent,
    data: [{
      'skin': 'skin-black',
      'display_tasks': false,
      'header_components': [{
        class: HeaderWidgetComponent,
        data: {
          label: 'test widget'
        }
      }]
    }],
    path: '',
  },
  //route with no boxed_style layout
  {
    canActivate: [CanActivateGuard],
    children: [
      {
        canActivate: [CanActivateGuard],
        loadChildren: './page-num/page-num.module#PageNumModule',
        path: 'page/:id'
      },
    ],
    component: LayoutAuthComponent,
    data: [{
      'skin': 'skin-black',
      'boxed_style': false,
      'display_tasks': false,
      'header_components': [{
        class: HeaderWidgetComponent,
        data: {
          label: 'test widget'
        }
      }]
    }],
    path: '',
  },
  // not logged routes
  {
    children: [
      {
        component: LoginComponent,
        path: ''
      }
    ],
    component: LayoutLoginComponent,
    path: 'login',
  },
  {
    canActivate: [CanActivateGuard],
    children: [
      {
        loadChildren: './estudio-judicial/estudio-judicial.module#EstudioJudicialModule',
        path: 'estudio-judicial'
      }
    ],
    component: LayoutAuthComponent,
    data: [{
      'skin': 'skin-black',
      'display_tasks': false,
      'header_components': [{
        class: HeaderWidgetComponent,
        data: {
          label: 'Widgetss'
        }
      }]
    }],
    path: '',
  },
  {
    canActivate: [CanActivateGuard],
    children: [
      {
        loadChildren: './estudio-sucursal/estudio-sucursal.module#EstudiosucursalModule',
        path: 'estudio-sucursal/:id'
      }
    ],
    component: LayoutAuthComponent,
    data: [{
      'skin': 'skin-black',
      'display_tasks': false,
      'header_components': [{
        class: HeaderWidgetComponent,
        data: {
          label: 'Widgetss'
        }
      }]
    }],
    path: '',
  },
  {
    canActivate: [CanActivateGuard],
    children: [
      {
        loadChildren: './sucursal-materia/sucursal-materia.module#SucursalMateriaModule',
        path: 'sucursal-materia/:id/:id'
      }
    ],
    component: LayoutAuthComponent,
    data: [{
      'skin': 'skin-black',
      'display_tasks': false,
      'header_components': [{
        class: HeaderWidgetComponent,
        data: {
          label: 'Widgetss'
        }
      }]
    }],
    path: '',
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
