import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface ImagenPublica {
  id: string;
  title: string;
  caption: string;
  src: string;
}

export interface VideoPublico {
  id: string;
  title: string;
  caption: string;
  url: string;
}

export interface Publicacion {
  _id: string;
  texto: string;
  imagenes: ImagenPublica[];
  videos: VideoPublico[];
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class TutorPublicacionesService {

  private readonly baseUrl = 'http://localhost:3000/api/publicaciones';

  constructor(private http: HttpClient) {}

  /** Obtiene TODAS las publicaciones del sistema */
  obtenerTodas(): Observable<{ datos: Publicacion[] }> {
    return this.http.get<{ datos: Publicacion[] }>(this.baseUrl).pipe(
      catchError(err => {
        console.error('Error al obtener todas las publicaciones:', err);
        return throwError(() => err);
      })
    );
  }

  /** Obtiene una publicación por ID */
  obtenerPorId(id: string): Observable<{ datos: Publicacion }> {
    return this.http.get<{ datos: Publicacion }>(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener publicación por ID:', err);
        return throwError(() => err);
      })
    );
  }
}
