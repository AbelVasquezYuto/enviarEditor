import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title: string = "Tickets";

  constructor(public _authService: AuthService, private router: Router){}

  logout(): void {
    this._authService.logout();
    //Swal.fire('Logout', 'Sesion cerrada', 'success');
    this.router.navigate(['/login']);
  }
}
