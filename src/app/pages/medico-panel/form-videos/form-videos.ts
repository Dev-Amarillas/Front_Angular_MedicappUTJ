import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-videos',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-videos.html'
})
export class FormVideosComponent {

  @Input() videos: string[] = [];
  @Output() videosCambiados = new EventEmitter<string[]>();

  nuevoVideo = '';

  agregar() {
    if (!this.nuevoVideo.trim()) return;
    this.videos.push(this.nuevoVideo);
    this.videosCambiados.emit(this.videos);
    this.nuevoVideo = '';
  }

  eliminar(i: number) {
    this.videos.splice(i, 1);
    this.videosCambiados.emit(this.videos);
  }
}
