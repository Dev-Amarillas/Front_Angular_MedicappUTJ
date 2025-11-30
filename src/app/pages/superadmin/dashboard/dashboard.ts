import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  // Propiedades que usa tu HTML
  totalAlumnos: number = 0;
  totalConsultas: number = 0;
  totalMedicos: number = 0;
  alertasActivas: number = 0;

  constructor() {
    // Aquí puedes cargar datos reales después
    this.cargarDatos();
  }

  cargarDatos() {
    // Datos de ejemplo (simulación)
    this.totalAlumnos = 50;
    this.totalConsultas = 120;
    this.totalMedicos = 8;
    this.alertasActivas = 3;
  }

  documentos = [
  { nombre: "doc.pdf", url: "docs/doc.pdf" },
  { nombre: "Justificante_02.pdf", url: "public/docs/Justificante_02.pdf" },
  { nombre: "Reporte_Medico.pdf", url: "public/docs/Reporte_Medico.pdf" }
];
abrirDocumento(doc: any) {
  window.open(doc.url, "_blank");
}



}
