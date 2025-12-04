import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private baseUrl = 'http://localhost:3000/api/publicaciones';

  constructor(private http: HttpClient) {}

  // OBTENER TODO
  obtenerContenido(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // ---------------- JSON ----------------
  editarContenido(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, payload);
  }

  crearContenido(payload: any): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  // ---------------- FormData ----------------
  crearContenidoFormData(form: FormData): Observable<any> {
    return this.http.post(this.baseUrl, form);
  }

  editarContenidoFormData(id: string, form: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, form);
  }
}
