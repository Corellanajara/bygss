import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserService } from 'ngx-admin-lte';
import { Router } from '@angular/router';
import { dbUserService } from '../_service/user.service';
import { ProductoService } from '../_service/product.service';

interface Usuario {
  Correo: string;
  Nombres: string;
  ApellidoPaterno: string;
  ApellidoMaterno : string,
  Direccion : string,
  Numero : string,
  _id : string,
}

@Component({
  selector: 'app-login',
  styles: ['./login.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public password: string = '';
  public email: string = '';
  public mensaje : string;
  public iniciando : boolean = false;
  constructor(
    private productService : ProductoService,
    private dbUser : dbUserService,
    private userServ: UserService,
    private router: Router,
  ) {

  }

  public ngOnInit() {
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    console.log("usuario cargado en sesion",usuario);
    if(usuario){
      this.openSesion(usuario);
    }
    window.dispatchEvent( new Event( 'resize' ) );
  }

  public login() {
    this.iniciando = true;
    let self = this;
    this.dbUser.validarExistencia(this.email,this.password).subscribe( user =>{

        if(user.length){
          let usuario = user[0];
          console.log("este es el usuario adquirido", usuario);
          sessionStorage.setItem('usuario', JSON.stringify(usuario));
          this.openSesion(usuario);
        }else{
          self.mensaje = "No existe usuario";
          this.iniciando = false;
        }

    });
  }

  public openSesion(usuario){

    const user1 = new User( {
        avatarUrl: 'assets/img/user2-160x160.jpg',
        email: usuario.Correo,
        firstname: usuario.Nombres,
        lastname: usuario.ApellidoPaterno
    } );
    
    user1.connected = true;

    this.userServ.setCurrent( user1 );

    this.router.navigate( ['home'] );

  }
}
