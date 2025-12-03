import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-texto',
   imports: [CommonModule, FormsModule],
  templateUrl: './form-texto.html'
})
export class FormTextoComponent {

  @Input() texto = '';
  @Output() textoCambiado = new EventEmitter<string>();

  guardar() {
    this.textoCambiado.emit(this.texto);
  }
}
