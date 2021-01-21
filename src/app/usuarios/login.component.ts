import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor Inicie Sesion";
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      //Swal.fire('Login', `${this.authService.usuario.username}, sesion ya iniciada`, 'info');
      this.router.navigate(['/']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null) {
      //Swal.fire('Error Login', 'Usuario o Password vacios', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      // let payload = JSON.parse(atob(response.access_token.split(".")[1]));
      // console.log(payload);
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      this.router.navigate(['/']);
      //Swal.fire('Bienvenido', `Hola ${usuario.username}, sesion iniciada`, 'success');
    }, err => {
      if (err.status == 400) {
        //Swal.fire('Error Login', 'Usuario o Password incorrectas', 'error');
      }
    });
  }
}
