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
  // SUPERADMIN
  if (this.usuario === 'superadmin' && this.password === '1234') {
    localStorage.setItem('user', 'superadmin');
    this.router.navigate(['/superadmin']);
    return;
  }

  // ALUMNOS
  const alumnoRegex = /^[0-9]{6,12}@soy\.utj\.edu\.mx$/;
  if (alumnoRegex.test(this.usuario) && this.password === 'alumno123') {
    localStorage.setItem('user', 'alumno');
    this.router.navigate(['/alumno']);
    return;
  }

  // TUTOR
  const tutorRegex = /^TUT-[0-9]{3}$/;
  if (tutorRegex.test(this.usuario) && this.password === 'tutor123') {
    localStorage.setItem('user', 'tutor');
    this.router.navigate(['/tutor']);
    return;
  }

  // MEDICO
  const medicoRegex = /^MED-[0-9]{3}$/;
  if (medicoRegex.test(this.usuario) && this.password === 'medico123') {
    localStorage.setItem('user', 'medico');
    this.router.navigate(['/medico']);
    return;
  }

  this.error = 'Usuario o contraseña incorrectos';
}

}
