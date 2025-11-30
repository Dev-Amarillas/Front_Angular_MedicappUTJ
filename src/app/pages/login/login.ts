import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  usuario = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  login() {
    if (this.usuario === 'superadmin' && this.password === '1234') {
      this.router.navigate(['/superadmin']);
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}
