import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TutorPublicacionesService } from '../../services/tutor';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './alumno.html',
  styleUrls: ['./alumno.css']
})
export class Alumno implements OnInit {

  constructor(
    private publicacionesService: TutorPublicacionesService,
    private sanitizer: DomSanitizer
  ) {}

  alumno = {
    nombre: '',
    matricula: '',
    carrera: '',
    correo: '',
    estadoMedico: ''
  };

  documentos: any[] = [];

  contenido: any = {
    texto: '',
    imagenes: [],
    videos: []
  };

  ngOnInit() {
    this.cargarContenidoPublico();
  }

  cargarContenidoPublico() {
    this.publicacionesService.obtenerTodas().subscribe({
      next: (res) => {

        if (!res.datos || res.datos.length === 0) {
          console.warn("No hay publicaciones públicas.");
          return;
        }

        // Tomamos la más nueva o la primera
        const publicacion = res.datos[0];

        const videosConvertidos = publicacion.videos.map((v: any) => {
          const id = this.extraerVideoId(v.url);
          return {
            ...v,
            embed: this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${id}`
            )
          };
        });

        this.contenido = {
          texto: publicacion.texto || "",
          imagenes: publicacion.imagenes || [],
          videos: videosConvertidos
        };

      },
      error: (err) => {
        console.error("Error cargando publicaciones:", err);
      }
    });
  }
 
  extraerVideoId(url: string): string {
    const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
    return match ? match[1] : "";
  }

  subirDocumento() {
    alert("Funcionalidad pendiente");
  }

  abrirDocumento(doc: any) {
    if (doc.url) window.open(doc.url, '_blank');
  }
}
