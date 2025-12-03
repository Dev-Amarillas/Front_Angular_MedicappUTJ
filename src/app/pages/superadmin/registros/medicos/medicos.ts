import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './medicos.html',
  styleUrls: ['./medicos.css']
})
export class MedicosComponent {

  preview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private usuarioService: UsuarioService) {}

  // ===== PREVIEW DE IMAGEN =====
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => this.preview = reader.result;
    reader.readAsDataURL(file);
  }

  // ===== OBJETO MÉDICO =====
  medico: any = {
    email: '',
    password: '',
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    rol: 'medico',
    turno: '',
    telefono: '',
    sede: '',
    imagen: '',
    nfc_uid: ''
  };

  // ===== GUARDAR =====
  guardar() {
    const formData = new FormData();

    // Campos normales
    formData.append('email', this.medico.email);
    formData.append('password', this.medico.password);
    formData.append('nombre', this.medico.nombre);
    formData.append('ap_paterno', this.medico.ap_paterno);
    formData.append('ap_materno', this.medico.ap_materno);
    formData.append('rol', this.medico.rol);
    formData.append('turno', this.medico.turno || '');
    formData.append('telefono', this.medico.telefono || '');
    formData.append('sede', this.medico.sede || '');
    formData.append('nfc_uid', this.medico.nfc_uid || '');

    // Imagen
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    // Enviar al backend
    this.usuarioService.crearUsuario(formData).subscribe({
      next: (res) => {
        alert('Médico guardado correctamente ✔');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al guardar médico', err);
        alert(`Error al guardar: ${err?.error?.mensaje || err.statusText || 'Error desconocido'}`);
      }
    });
  }

  // ===== LIMPIAR FORMULARIO =====
  resetForm() {
    this.medico = {
      email: '',
      password: '',
      nombre: '',
      ap_paterno: '',
      ap_materno: '',
      rol: 'medico',
      turno: '',
      telefono: '',
      sede: '',
      imagen: '',
      nfc_uid: ''
    };

    this.preview = null;
    this.selectedFile = null;
  }
}
