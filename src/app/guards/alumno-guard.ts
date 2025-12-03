import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlumnoGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const rol = localStorage.getItem('rol');

    if (rol === 'alumno') return true;

    this.router.navigate(['/login']);
    return false;
  }
}
