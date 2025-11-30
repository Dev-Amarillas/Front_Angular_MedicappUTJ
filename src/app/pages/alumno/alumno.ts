import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './alumno.html',
  styleUrls: ['./alumno.css']
})
export class Alumno {

  // === Información del alumno (simulada o recibida por login) ===
  alumno = {
    nombre: 'Nombre del Alumno',
    matricula: '000000000',
    carrera: 'Carrera del Alumno',
    correo: 'correo@utj.edu.mx',
    estadoMedico: ''  // puedes llenarlo luego
  };

  // === Lista de documentos PDF subidos ===
  documentos: any[] = [
    //  Ejemplo:
    // { nombre: 'Constancia Médica.pdf', url: 'https://...' }
  ];

  // === Método para subir un PDF ===
  subirDocumento() {
    console.log('Subiendo documento...');
    // Aquí luego conectas backend
    alert('Función de subir documento lista para implementar.');
  }

  // === Método para abrir un PDF ===
  abrirDocumento(doc: any) {
    if (doc.url) {
      window.open(doc.url, '_blank');
    } else {
      alert('Este documento aún no tiene archivo subido.');
    }
  }
}
