import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './alumnos.html',
  styleUrls: ['./alumnos.css']
})
export class AlumnosComponent {

  constructor(private usuarioService: UsuarioService) {}

  preview: string | ArrayBuffer | null = null;
  imagenSeleccionada: File | null = null;

  alumno: any = {
    nombre: "",
    ap_paterno: "",
    ap_materno: "",
    email: "",
    password: "",
    rol: "alumno",
    id_tutor: "",
    carrera: "",
    sede: "",
    nfc_uid: "",
    curp: "",
    alergia: "",
    sangre: "",
    telefono: "",
    segurosocial: "",
  };
 // TUTORES
  tutores: any[] = [];

ngOnInit() {
  this.cargarTutores();
}

cargarTutores() {
  this.usuarioService.obtenerTutores().subscribe({
    next: (res) => {
      this.tutores = res;
    },
    error: (err) => console.error("Error al cargar tutores", err)
  });
}


  // === PREVISUALIZACIÓN DE IMAGEN ===
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.imagenSeleccionada = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result; // aquí se genera la previsualización
    };
    reader.readAsDataURL(file);
  }

  guardar() {
    const formData = new FormData();

    // Agregar campos normales
    Object.keys(this.alumno).forEach(key => {
      formData.append(key, this.alumno[key]);
    });

    // Agregar imagen
    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    this.usuarioService.crearUsuario(formData).subscribe({
      next: (res) => {
        alert("Alumno creado correctamente ✔");
      },
      error: (err) => {
        console.error("Error al guardar alumno:", err);
        alert(err?.error?.mensaje || "Error al guardar");
      }
    });
  }
}
