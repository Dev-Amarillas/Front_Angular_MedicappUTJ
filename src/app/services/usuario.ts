import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}


  // 1. OBTENER TODOS
  obtenerUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  // 2. OBTENER POR ID
  obtenerUsuarioId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // 3. CREAR USUARIO
  // Soporta imagen (FormData)
  crearUsuario(formData: FormData): Observable<any> {
    // Si tu backend requiere token para crear:
    const token = localStorage.getItem('token'); // o donde guardes
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    // No setees Content-Type; browser lo maneja por FormData
    return this.http.post(this.apiUrl, formData, { headers });
  }


  // 4. ACTUALIZAR USUARIO
  actualizarUsuario(id: string, data: any, archivo?: File): Observable<any> {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    if (archivo) {
      formData.append('imagen', archivo);
    }

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }


  // 5. ELIMINAR USUARIO
  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  obtenerTutores(): Observable<any> {
  return this.http.get(`${this.apiUrl}/tutores`);
}


}
