import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {
  admin = {
    nombre: '',
    correo: ''
  };

  guardar() {
    console.log("Administrador guardado:", this.admin);
  }
}
