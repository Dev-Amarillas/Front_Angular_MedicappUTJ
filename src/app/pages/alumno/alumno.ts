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
      next: (data) => {
        // Convertimos embed de videos para Angular
        data.videos = data.videos.map((v: any) => ({
          ...v,
          embed: this.sanitizer.bypassSecurityTrustResourceUrl(v.embed)
        }));

        this.contenido = data;
      },
      error: (err) => {
        console.error("Error cargando contenido:", err);
      }
    });
  }

  subirDocumento() {
    alert("Funcionalidad pendiente");
  }

  abrirDocumento(doc: any) {
    if (doc.url) window.open(doc.url, '_blank');
  }
}
