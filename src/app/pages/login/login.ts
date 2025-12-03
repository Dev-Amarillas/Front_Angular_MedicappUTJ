import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';       
  password = '';
  error = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const rol = localStorage.getItem('rol');

        if (rol === 'superadmin') this.router.navigate(['/superadmin']);
        else if (rol === 'alumno') this.router.navigate(['/alumno']);
        else if (rol === 'tutor') this.router.navigate(['/tutor']);
        else if (rol === 'medico') this.router.navigate(['/medico']);
        else this.error = 'Rol no reconocido';
      },
      error: (err) => {
        this.error = err.error?.message || 'Credenciales incorrectas';
      }
    });
  }
}
