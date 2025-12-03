import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario';

@Component({
  selector: 'app-tutores',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tutores.html',
  styleUrls: ['./tutores.css']
})
export class TutoresComponent {

  preview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  tutor: any = {
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    email: '',
    password: '',
    rol: 'tutor',
    gradogrupo: '',
    imagen: '',
    nfc_uid: ''
  };

  constructor(private usuarioService: UsuarioService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;
    this.tutor.imagen = file;

    const reader = new FileReader();
    reader.onload = () => this.preview = reader.result;
    reader.readAsDataURL(file);
  }

  guardar() {
    const formData = new FormData();

    // agrega campos textuales
    formData.append('nombre', this.tutor.nombre);
    formData.append('ap_paterno', this.tutor.ap_paterno);
    formData.append('ap_materno', this.tutor.ap_materno);
    formData.append('email', this.tutor.email);
    formData.append('password', this.tutor.password);
    formData.append('rol', this.tutor.rol);
    formData.append('gradogrupo', this.tutor.gradogrupo || '');
    formData.append('nfc_uid', this.tutor.nfc_uid || '');

    // agrega archivo si existe
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    this.usuarioService.crearUsuario(formData).subscribe({
      next: (res) => {
        alert('Tutor guardado correctamente ✔');
        // limpia formulario si quieres
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al guardar tutor', err);
        alert(`Error al guardar: ${err?.error?.mensaje || err.statusText || 'Error'}`);
      }
    });
  }

  resetForm() {
    this.tutor = {
      nombre: '',
      ap_paterno: '',
      ap_materno: '',
      email: '',
      password: '',
      rol: 'tutor',
      gradogrupo: '',
      imagen: '',
      nfc_uid: ''
    };
    this.preview = null;
    this.selectedFile = null;
  }
}
