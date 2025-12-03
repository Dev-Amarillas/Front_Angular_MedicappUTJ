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
  src?: string;      // URL guardada en BD
  file?: File;       // archivo nuevo
  preview?: string;  // dataURL para previsualización
};

type VideoItem = {
  id: string;
  title: string;
  caption: string;
  url: string;
  embed?: SafeResourceUrl;
};

@Component({
  selector: 'app-medico-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './medico-panel.html',
  styleUrls: ['./medico-panel.css']
})
export class MedicoPanelComponent {

  constructor(
    private sanitizer: DomSanitizer, 
    private miServicio: MedicoService
  ) {}

  panelId?: string;

  textoPublico: string = 'Bienvenido a mi consultorio virtual.';
  imagenes: ImageItem[] = [];
  videos: VideoItem[] = [];

  nuevaImagenFile?: File;
  nuevaImagenTitle = '';
  nuevaImagenCaption = '';

  nuevoVideoUrl = '';
  nuevoVideoTitle = '';
  nuevoVideoCaption = '';

  // ────────────────────────────────────────────────
  // CARGAR INFO DESDE BACKEND
  // ────────────────────────────────────────────────
  ngOnInit() {
    this.miServicio.obtenerContenido().subscribe({
      next: (resp: any) => {
        const data = Array.isArray(resp?.datos) ? resp.datos[0] : resp?.datos;
        if (!data) return;

        this.panelId = data._id;
        this.textoPublico = data.texto || this.textoPublico;

        // imágenes guardadas → src directo de BD
        this.imagenes = (data.imagenes || []).map((img: any) => ({
          id: img.id,
          title: img.title,
          caption: img.caption,
          src: img.src
        }));

        // videos → generar embed
        this.videos = (data.videos || []).map((v: any) => ({
          ...v,
          embed: this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${this.extraerIdYoutube(v.url)}`
          )
        }));
      },
      error: (err) => console.error("Error cargando datos:", err)
    });
  }

  // ────────────────────────────────────────────────
  // IMÁGENES
  // ────────────────────────────────────────────────
  onImageFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.nuevaImagenFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      (document.getElementById('preview-nueva-imagen') as HTMLImageElement)?.setAttribute('src', reader.result as string);
    };
    reader.readAsDataURL(this.nuevaImagenFile);
  }

  agregarImagen() {
    if (!this.nuevaImagenFile) {
      alert("Selecciona primero una imagen.");
      return;
    }

    const file = this.nuevaImagenFile;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagenes.push({
        id: this.uuid(),
        title: this.nuevaImagenTitle || 'Sin título',
        caption: this.nuevaImagenCaption || '',
        file,
        preview: reader.result as string
      });

      // reset
      this.nuevaImagenFile = undefined;
      this.nuevaImagenTitle = '';
      this.nuevaImagenCaption = '';
      (document.getElementById('input-nueva-imagen') as HTMLInputElement)!.value = '';
      (document.getElementById('preview-nueva-imagen') as HTMLImageElement)?.removeAttribute('src');
    };

    reader.readAsDataURL(file);
  }

  editarImagenCampo(id: string, campo: 'title' | 'caption', valor: string) {
    const img = this.imagenes.find(i => i.id === id);
    if (img) img[campo] = valor;
  }

  eliminarImagen(id: string) {
    this.imagenes = this.imagenes.filter(i => i.id !== id);
  }

  // ────────────────────────────────────────────────
  // VIDEOS
  // ────────────────────────────────────────────────
  agregarVideo() {
    const url = this.nuevoVideoUrl.trim();
    if (!url) return alert("Ingresa la URL del video.");

    const id = this.extraerIdYoutube(url);
    if (!id) return alert("URL de YouTube inválida.");

    this.videos.push({
      id: this.uuid(),
      title: this.nuevoVideoTitle || 'Sin título',
      caption: this.nuevoVideoCaption || '',
      url,
      embed: this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`)
    });

    this.nuevoVideoUrl = '';
    this.nuevoVideoTitle = '';
    this.nuevoVideoCaption = '';
  }

  editarVideoCampo(id: string, campo: 'title' | 'caption', valor: string) {
    const v = this.videos.find(x => x.id === id);
    if (v) v[campo] = valor;
  }

  eliminarVideo(id: string) {
    this.videos = this.videos.filter(v => v.id !== id);
  }

  // ────────────────────────────────────────────────
  // UTILIDADES
  // ────────────────────────────────────────────────
  extraerIdYoutube(url: string): string {
    const reg = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const m = url.match(reg);
    if (m?.[1]) return m[1];

    const obj = new URL(url, window.location.origin);
    const v = obj.searchParams.get("v");
    return v?.length === 11 ? v : '';
  }

  uuid() {
    return Math.random().toString(36).substring(2, 9);
  }

  // ────────────────────────────────────────────────
  // GUARDAR CAMBIOS (A → MULTIPLES IMÁGENES + upload)
  // ────────────────────────────────────────────────
  guardarCambios() {
    const imagenesKeep = this.imagenes
      .filter(i => i.src && !i.file)
      .map(i => ({
        id: i.id,
        title: i.title,
        caption: i.caption,
        src: i.src
      }));

    const imagenesMeta: Array<any> = [];
    const newFiles: File[] = [];

    this.imagenes.forEach(i => {
      if (i.file) {
        newFiles.push(i.file);
        imagenesMeta.push({
          id: i.id,
          title: i.title,
          caption: i.caption
        });
      }
    });

    const form = new FormData();
    form.append('texto', this.textoPublico);
    form.append('videos', JSON.stringify(
      this.videos.map(v => ({
        id: v.id,
        title: v.title,
        caption: v.caption,
        url: v.url
      }))
    ));

    form.append('imagenesKeep', JSON.stringify(imagenesKeep));
    form.append('imagenesMeta', JSON.stringify(imagenesMeta));
    newFiles.forEach(f => form.append('imagenes', f));

    if (!this.panelId) {
      this.miServicio.crearContenidoFormData(form).subscribe({
        next: (resp) => {
          alert("Contenido creado correctamente ✔");
          if (resp?.datos?._id) this.panelId = resp.datos._id;
        },
        error: (err) => console.error(err)
      });
      return;
    }

    this.miServicio.editarContenidoFormData(this.panelId, form).subscribe({
      next: () => alert("Cambios guardados correctamente ✔"),
      error: (err) => console.error(err)
    });
  }
}
