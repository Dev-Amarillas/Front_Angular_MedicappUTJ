import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-imagenes',
   imports: [CommonModule, FormsModule],
  templateUrl: './form-imagenes.html'
})
export class FormImagenesComponent {
  
  @Input() imagenes: string[] = [];
  @Output() imagenesCambiadas = new EventEmitter<string[]>();

  nuevaImagen = '';

  agregar() {
    if (!this.nuevaImagen.trim()) return;
    this.imagenes.push(this.nuevaImagen);
    this.imagenesCambiadas.emit(this.imagenes);
    this.nuevaImagen = '';
  }

  eliminar(i: number) {
    this.imagenes.splice(i, 1);
    this.imagenesCambiadas.emit(this.imagenes);
  }
}
