import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './medicos.html',
  styleUrls: ['./medicos.css']
})
export class MedicosComponent {
  medico = {
    nombre: '',
    especialidad: ''
  };

  guardar() {
    console.log("Médico guardado:", this.medico);
  }
}
