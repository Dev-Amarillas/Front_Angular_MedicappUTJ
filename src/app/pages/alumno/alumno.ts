import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MedicoService } from '../../services/editarContenido';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './alumno.html',
  styleUrls: ['./alumno.css']
})
export class Alumno implements OnInit {

  constructor(
    private servicio: MedicoService,
    private sanitizer: DomSanitizer
  ) {}

  alumno = {
    nombre: 'Nombre del Alumno',
    matricula: '000000000',
    carrera: 'Carrera del Alumno',
    correo: 'correo@utj.edu.mx',
    estadoMedico: ''
  };

  documentos: any[] = [];

  // === Contenido público proveniente del médico ===
  contenido: any = {
    texto: '',
    imagenes: [],
    videos: []
  };

  ngOnInit() {
    this.cargarContenidoPublico();
  }

  cargarContenidoPublico() {
  this.servicio.obtenerContenido().subscribe({
    next: (res: any) => {

      const data = res.datos;

      // Convertir videos (crear embed a partir del URL)
      const videosConvertidos = data.videos.map((v: any) => {
        const id = this.extraerVideoId(v.url);
        return {
          ...v,
          embed: this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${id}`
          )
        };
      });

      this.contenido = {
        texto: data.texto || "",
        imagenes: data.imagenes || [],
        videos: videosConvertidos
      };

    },
    error: (err) => {
      console.error("Error cargando contenido:", err);
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
