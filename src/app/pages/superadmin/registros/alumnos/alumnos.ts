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
    nombre: "",
    ap_paterno: "",
    ap_materno: "",
    email: "",
    password: "",
    rol: "alumno",
    id_tutor: "",
    carrera: "",
    sede: "",
    curp: "",
    alergia: [] as string[],
    sangre: "",
    telefono: "",
    segurosocial: "",
    alergiasTexto: ""   
  };

  guardar() {
    this.alumno.alergia = this.alumno.alergiasTexto
      .split(",")
      .map(a => a.trim())
      .filter(a => a !== "");

    console.log("Alumno guardado:", this.alumno);
  }
}
