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
        loadChildren: './stock/stock.module#StockModule',
        path: 'stock'
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
        loadChildren: './pedido/pedido.module#PedidoModule',
        path: 'pedido'
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
        loadChildren: './vendido/vendido.module#VendidoModule',
        path: 'vendido'
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
        loadChildren: './agregar/agregar.module#AgregarModule',
        path: 'agregar'
      }
    ],
    component: LayoutAuthComponent,
    data: [{
      'skin': 'skin-black',
      'display_tasks': false,
      'header_components': [{
        class: HeaderWidgetComponent,
        data: {
          label: 'agregar'
        }
      }]
    }],
    path: '',
  }
  /*,
  {
    canActivate: [CanActivateGuard],
    children: [
      {
        loadChildren: './stock/estudio-sucursal/estudio-sucursal.module#EstudiosucursalModule',
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
        loadChildren: './stock/estudio-causa/estudio-causa.module#EstudioCausaModule',
        path: 'estudio-causa/:sucursal/:modulo'
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
        loadChildren: './stock/sucursal-materia/sucursal-materia.module#SucursalMateriaModule',
        path: 'sucursal-materia/:sucursal/:modulo/:id'
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
*/
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
