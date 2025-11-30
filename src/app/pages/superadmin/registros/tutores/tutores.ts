import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tutores',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tutores.html',
  styleUrls: ['./tutores.css']
})
export class TutoresComponent {
  tutor = {
    nombre: '',
    telefono: ''
  };

  guardar() {
    console.log("Tutor guardado:", this.tutor);
  }
}
