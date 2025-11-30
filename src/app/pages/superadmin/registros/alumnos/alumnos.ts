import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alumnos.html',
  styleUrls: ['./alumnos.css']
})
export class AlumnosComponent {
  alumno = {
    nombre: '',
    apellido: '',
    correo: '',
    carrera: ''
  };

  guardar() {
    console.log("Alumno guardado:", this.alumno);
  }
}
