import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TutorGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const rol = localStorage.getItem('rol');

    if (rol === 'tutor') return true;

    this.router.navigate(['/login']);
    return false;
  }
}
