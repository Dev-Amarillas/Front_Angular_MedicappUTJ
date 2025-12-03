import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MedicoService } from '../../services/editarContenido';
import { RouterLink } from '@angular/router';

type ImageItem = {
  id: string;
  title: string;
  caption: string;
  src: string; // data URL o URL pública
};

type VideoItem = {
  id: string;
  title: string;
  caption: string;
  url: string; // original URL
  embed?: SafeResourceUrl; // sanitized embed url
};

@Component({
  selector: 'app-medico-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './medico-panel.html',
  styleUrls: ['./medico-panel.css']
})
export class MedicoPanelComponent {
  constructor(private sanitizer: DomSanitizer, private miServicio: MedicoService ) {}

  // Texto público editable
  textoPublico: string = 'Bienvenido a mi consultorio virtual.';

  // Imágenes gestionadas por el médico
  imagenes: ImageItem[] = [
    // ejemplo: { id:'1', title:'Título', caption:'Texto', src:'https://...' }
  ];

  // Videos gestionados por el médico
  videos: VideoItem[] = [
    // ejemplo: { id:'v1', title:'Video demo', caption:'Descripción', url:'https://youtu.be/...' }
  ];

  // Campos temporales para agregar
  nuevaImagenFile?: File;
  nuevaImagenTitle = '';
  nuevaImagenCaption = '';

  nuevoVideoUrl = '';
  nuevoVideoTitle = '';
  nuevoVideoCaption = '';

  // ===== Imágenes =====
  onImageFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    this.nuevaImagenFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      // previsualización inmediata: asignar dataURL como src
      this.nuevaImagenFile = file;
      // Guardamos dataURL temporal en src de un item cuando se agregue
      // mostramos automáticamente la previsualización en template usando file preview
      const dataUrl = reader.result as string;
      // opcional: podemos mostrar mini preview vía una variable temporal
      (document.getElementById('preview-nueva-imagen') as HTMLImageElement | null)?.setAttribute('src', dataUrl);
    };
    reader.readAsDataURL(file);
  }

  agregarImagen() {
    if (!this.nuevaImagenFile) {
      alert('Selecciona primero una imagen.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      this.imagenes.push({
        id: this.uuid(),
        title: this.nuevaImagenTitle || 'Sin título',
        caption: this.nuevaImagenCaption || '',
        src
      });
      // reset
      this.nuevaImagenFile = undefined;
      this.nuevaImagenTitle = '';
      this.nuevaImagenCaption = '';
      const input = document.getElementById('input-nueva-imagen') as HTMLInputElement | null;
      if (input) input.value = '';
      const prev = document.getElementById('preview-nueva-imagen') as HTMLImageElement | null;
      if (prev) prev.removeAttribute('src');
    };
    reader.readAsDataURL(this.nuevaImagenFile!);
  }

  editarImagenCampo(id: string, campo: 'title' | 'caption', valor: string) {
    const it = this.imagenes.find(i => i.id === id);
    if (!it) return;
    if (campo === 'title') it.title = valor;
    else it.caption = valor;
  }

  eliminarImagen(id: string) {
    this.imagenes = this.imagenes.filter(i => i.id !== id);
  }

  // ===== Videos =====
  agregarVideo() {
    const url = this.nuevoVideoUrl.trim();
    if (!url) {
      alert('Ingresa la URL de YouTube.');
      return;
    }
    const id = this.extraerIdYoutube(url);
    if (!id) {
      alert('No se pudo extraer el ID de YouTube. Usa una URL válida.');
      return;
    }
    const embed = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`);
    const item: VideoItem = {
      id: this.uuid(),
      title: this.nuevoVideoTitle || 'Sin título',
      caption: this.nuevoVideoCaption || '',
      url,
      embed
    };
    this.videos.push(item);
    // reset
    this.nuevoVideoUrl = '';
    this.nuevoVideoTitle = '';
    this.nuevoVideoCaption = '';
  }

  editarVideoCampo(id: string, campo: 'title' | 'caption', valor: string) {
    const it = this.videos.find(v => v.id === id);
    if (!it) return;
    if (campo === 'title') it.title = valor;
    else it.caption = valor;
  }

  eliminarVideo(id: string) {
    this.videos = this.videos.filter(v => v.id !== id);
  }

  // Convierte URLs existentes (si las pones manualmente) a embed y sanitize
  sanitizeAllVideos() {
    this.videos.forEach(v => {
      const id = this.extraerIdYoutube(v.url);
      if (id) v.embed = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`);
    });
  }

  // ===== Utilidades =====
  extraerIdYoutube(url: string): string {
    // Soporta muchos formatos (youtu.be, watch?v=, embed/)
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const m = url.match(regExp);
    if (m && m[1]) return m[1];
    // fallback: try to capture v= param
    const urlObj = new URL(url, window.location.origin);
    const v = urlObj.searchParams.get('v');
    if (v && v.length === 11) return v;
    return '';
  }

  uuid() {
    // id simple
    return Math.random().toString(36).slice(2, 9);
  }
  guardarCambios() {
  const payload = {
    texto: this.textoPublico,
    imagenes: this.imagenes,
    videos: this.videos
  };

  console.log("Enviando datos actualizados:", payload);

  this.miServicio.editarContenido(payload).subscribe({
    next: (resp) => {
      alert("Cambios guardados correctamente ✔");
    },
    error: (err) => {
      console.error(err);
      alert("Ocurrió un error al guardar los cambios");
    }
  });
}

}
