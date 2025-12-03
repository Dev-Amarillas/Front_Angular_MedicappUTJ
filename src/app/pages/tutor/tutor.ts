import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tutor.html',
  styleUrl: './tutor.css',
})
export class Tutor implements OnInit {

  contenido: any = {
    texto: '',
    imagenes: [],
    videos: []
  };

  alumno: any = {
    nombre: '',
    matricula: '',
    carrera: '',
    correo: '',
    estadoMedico: ''
  };

  documentos: any[] = [];

  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarContenido();
    this.cargarAlumno();
    this.cargarDocumentos();
  }

  // ========== CARGAR CONTENIDO MÉDICO ==========
  cargarContenido() {
    this.http.get(`${this.api}/panel/publico`)
      .subscribe((res: any) => {
        this.contenido = res.datos || this.contenido;
      });
  }

  // ========== CARGAR INFORMACIÓN DEL ALUMNO ==========
  cargarAlumno() {
    this.http.get(`${this.api}/alumno/info`)
      .subscribe((res: any) => {
        this.alumno = res.datos || this.alumno;
      });
  }

  // ========== CARGAR DOCUMENTOS DEL ALUMNO ==========
  cargarDocumentos() {
    this.http.get(`${this.api}/alumno/documentos`)
      .subscribe((res: any) => {
        this.documentos = res.datos || [];
      });
  }

  // ========== ABRIR DOCUMENTO ==========
  abrirDocumento(doc: any) {
    window.open(doc.url, '_blank');
  }
}
