import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap((resp) => {
        if (resp.estado && resp.data.token) {
          const token = resp.data.token;

          // Guardar token
          localStorage.setItem('token', token);

          // Guardar usuario completo
        localStorage.setItem('usuario', JSON.stringify(resp.data.usuario));

          // Decodificar el rol
          const payload = JSON.parse(atob(token.split('.')[1]));
          localStorage.setItem('rol', payload.rol);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }

  getRol() {
    return localStorage.getItem('rol');
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }
}
