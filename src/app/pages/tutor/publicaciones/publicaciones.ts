import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TutorPublicacionesService, Publicacion } from '../../../services/tutor';
import { SafeUrlPipe } from '../../../pipes/safe-url-pipe';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeUrlPipe],
  templateUrl: './publicaciones.html',
  styleUrls: ['./publicaciones.css']
})
export class PublicacionesComponent implements OnInit {

  publicaciones: Publicacion[] = [];
  cargando = true;

  constructor(private tutorSrv: TutorPublicacionesService) {}

  ngOnInit() {
    this.cargarPublicaciones();
  }

  private cargarPublicaciones(): void {
    this.tutorSrv.obtenerTodas().subscribe({
      next: (resp) => {

        const lista = Array.isArray(resp?.datos) ? resp.datos : [];

        // Solo un paso para limpiar imágenes/videos
        this.publicaciones = lista.map((p) => ({
          ...p,
          imagenes: p.imagenes ?? [],
          videos: p.videos ?? []
        }));

        this.cargando = false;
      },
      error: (err) => {
        console.error("Error cargando publicaciones del tutor:", err);
        this.cargando = false;
      }
    });
  }

  // TrackBy para máximo rendimiento
  trackByPub(_: number, item: Publicacion) {
    return item._id;
  }

  trackByVideo(_: number, item: any) {
    return item.id;
  }

  trackByImg(_: number, item: any) {
    return item.id;
  }
}
