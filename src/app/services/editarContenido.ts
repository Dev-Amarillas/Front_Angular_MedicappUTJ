import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private baseUrl = 'http://localhost:3000/api/panel'; // Ajusta la URL

  constructor(private http: HttpClient) {}
  
obtenerContenido(): Observable<any> {
  return this.http.get(`${this.baseUrl}/obtener`);
}

  editarContenido(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar`, payload);
  }
}
