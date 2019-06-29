import { Component, OnInit } from '@angular/core';
import {
  User,
  MenuService,
  Message,
  MessagesService,
  NotificationsService,
  Notification,
  LogoService,
  FooterService
} from 'ngx-admin-lte';
import { MenuWidgetComponent } from './widgets/menu-widget/menu-widget.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // define your footer links
  private footer = {
      left_part: `<strong>
        Copyright &copy; 2019
        Bygss
    	</strong>
      todos los derechos reservados`,
      right_part: 'Cristopher Orellana',
    };
  // define here your own links menu structure
  private mylinks: any = [
    {
      'header': 'Menu navegación'
    },
    {
      'title': 'Home',
      'icon': 'dashboard',
      'link': ['/']
    },
    {
      'title': 'Stock',
      'icon': 'book',
      'link': ['/stock']
    },
    {
      'title': 'Pedido',
      'icon': 'book',
      'link': ['/pedido']
    },
    {
      'title': 'Vendido',
      'icon': 'book',
      'link': ['/vendido']
    },
    {
      'title': 'Agregar',
      'icon': 'book',
      'link': ['/agregar']
    }/*,
    {
      'title': 'otro',
      'icon': 'dashboard',
      'link': ['/']
    },
    {
      'title': 'otro',
      'icon': 'dashboard',
      'link': ['/']
    },
    {
      'title': '',
      'icon': 'dashboard',
      'link': ['/']
    },
    {
      'title': 'Sub menu',
      'icon': 'link',
      'sublinks': [
        {
          'title': 'Page 2',
          'link': ['/page/2'],
        },
        {
          'title': 'Page 3',
          'link': ['/page/3'],
        }
      ]
    },
    {
      'title': 'External Link',
      'icon': 'google',
      'link': ['http://google.com'],
      'external': true,
      'target': '_blank'
    },
    {
      'title': 'External Links',
      'icon': 'link',
      'sublinks': [
        {
          'title': 'Github',
          'link': ['https://github.com/TwanoO67/ngx-admin-lte'],
          'icon': 'github',
          'external': true,
          'target': '_blank'
        },
        {
          'title': 'Yahoo',
          'link': ['http://yahoo.com'],
          'icon': 'yahoo',
          'external': true,
          'target': '_blank'
        }
      ]
    },

    // external widget
    {
      class: MenuWidgetComponent,
      data: {
        label: 'test component'
      }
    }
    */
  ];
  // define here your logo
  private logo = {
    html_mini: 'B<b>&</b>Y',
    html_lg: 'BYGSS',
  };

  constructor(
    private footerServ: FooterService,
    private menuServ: MenuService,
    private logoServ: LogoService,
    private msgServ: MessagesService,
    private notifServ: NotificationsService
  ) {

  }

  public ngOnInit() {
    // define menu
    this.menuServ.setCurrent(this.mylinks);

    this.footerServ.setCurrent(this.footer);
    this.logoServ.setCurrent(this.logo);

    // FAKE MESSAGE
    // defining some test users
    const user1 = new User( {
        avatarUrl: 'assets/img/user2-160x160.jpg',
        email: 'corellanajara@proteccionyamparo.cl',
        firstname: 'Cristopher',
        lastname: 'Orellana'
    });
    const user2 = new User( {
        //avatarUrl: 'assets/img/user2-160x160.jpg',
        email: 'EMAIL',
        firstname: 'FIRSTNAME',
        lastname: 'LASTNAME'
    });
    // sending a test message
    this.msgServ.addMessage( new Message( {
        author: user2,
        content: 'Mensaje ',
        destination: user1,
        title: 'Ojo hay algo que ver'
    }) );
    // sending a test notif
    this.notifServ.addNotification( new Notification( {
        class: 'fa fa-users text-aqua',
        content: 'hay una notificacion',
        link: '/page/2'
    }) );


  }

}
