import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface ImagenPublica {
  id: string;
  title: string;
  caption: string;
  src: string;
}

interface VideoPublico {
  id: string;
  title: string;
  caption: string;
  url: string;
  embed: SafeResourceUrl;
}

interface PublicacionData {
  texto: string;
  imagenes: ImagenPublica[];
  videos: VideoPublico[];
}

interface DocumentoData {
  nombre: string;
  url: string;
}

@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tutor.html',
  styleUrls: ['./tutor.css']
})
export class TutorComponent implements OnInit {

  // Estados
  loading = true;
  loadingDocs = true;

  contenido: PublicacionData = {
    texto: '',
    imagenes: [],
    videos: []
  };

  documentos: DocumentoData[] = [];

  readonly baseApi = 'http://localhost:3000';
  readonly api = this.baseApi + '/api';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.obtenerPublicacionActual();
    this.obtenerDocumentos();
  }

  // =====================================================
  // PUBLICACIÓN MÉDICA
  // =====================================================
  private obtenerPublicacionActual(): void {
    this.http.get<any>(`${this.api}/publicaciones`).subscribe({
      next: (resp) => {
        const data = Array.isArray(resp?.datos) ? resp.datos[0] : resp?.datos;

        if (data) {
          this.contenido = {
            texto: data.texto || '',
            imagenes: (data.imagenes || []).map((img: any) => ({
              id: img.id,
              title: img.title,
              caption: img.caption,
              src: this.toAbsolute(img.src)
            })),
            videos: (data.videos || []).map((v: any) => ({
              id: v.id,
              title: v.title,
              caption: v.caption,
              url: v.url,
              embed: this.sanitizer.bypassSecurityTrustResourceUrl(
                `https://www.youtube.com/embed/${this.extraerVideoId(v.url)}`
              )
            }))
          };
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando contenido médico:', err);
        this.loading = false;
      }
    });
  }

  // =====================================================
  // DOCUMENTOS
  // =====================================================
  private obtenerDocumentos(): void {
    this.http.get<any>(`${this.api}/justificantes`).subscribe({
      next: (res) => {
        const datos = res?.datos || [];

        this.documentos = datos.map((d: any, idx: number) => ({
          nombre: d.nombre || `Documento ${idx + 1}`,
          url: this.toAbsolute(d.url || d.ruta || '')
        }));

        this.loadingDocs = false;
      },
      error: () => {
        this.loadingDocs = false;
      }
    });
  }

  abrirDocumento(doc: DocumentoData): void {
    if (doc?.url) window.open(doc.url, '_blank');
  }

  // =====================================================
  // UTILIDADES
  // =====================================================
  private toAbsolute(path: string): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return this.baseApi + (path.startsWith('/') ? path : '/' + path);
  }

  private extraerVideoId(url: string = ''): string {
    const reg = /(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    return url.match(reg)?.[1] || '';
  }
}
