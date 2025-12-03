// src/app/tutor/tutor.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type ImgFromApi = { id?: string; title?: string; caption?: string; src?: string } | string;
type VidFromApi = { id?: string; title?: string; caption?: string; url?: string } | string;
type DocFromApi = { nombre?: string; url?: string } | string;

@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tutor.html',
})
export class TutorComponent implements OnInit {

  // =============================
  // EVITA TODOS LOS ERRORES NG8107
  // =============================
  contenido: {
    texto: string;
    imagenes: Array<{ id: string; title: string; caption: string; url: string }>;
    videos: Array<{ id: string; title: string; caption: string; url: string; embed: SafeResourceUrl }>;
  } = {
    texto: '',
    imagenes: [],
    videos: []
  };

  documentos: Array<{ nombre: string; url: string }> = [];

  private readonly baseApi = 'http://localhost:3000';
  private readonly api = this.baseApi + '/api';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.cargarContenidoMedico();
    this.cargarDocumentos();
  }

  // =============================
  // CARGAR CONTENIDO MÉDICO
  // =============================
  cargarContenidoMedico() {
    this.http.get<any>(`${this.api}/publicaciones`).subscribe({
      next: (resp) => {
        const datos = resp?.datos;

        if (!Array.isArray(datos) || datos.length === 0) {
          console.warn('No hay publicaciones médicas en la API');
          return;
        }

        const pub = datos[0];

        this.contenido.texto = pub?.texto || '';

        // ---------------------------
        // NORMALIZAR IMÁGENES
        // ---------------------------
        this.contenido.imagenes = (pub?.imagenes || []).map((item: ImgFromApi, idx: number) => {
          if (typeof item === 'string') {
            return {
              id: String(idx),
              title: '',
              caption: '',
              url: this.fixToAbsolute(item)
            };
          }

          return {
            id: item.id || String(idx),
            title: item.title || '',
            caption: item.caption || '',
            url: this.fixToAbsolute(item.src || '')
          };
        });

        // ---------------------------
        // NORMALIZAR VIDEOS
        // ---------------------------
        this.contenido.videos = (pub?.videos || []).map((v: VidFromApi, idx: number) => {
          const urlStr = typeof v === 'string' ? v : (v.url || '');
          const id = this.extraerVideoId(urlStr);

          const embedUrl = id
            ? `https://www.youtube.com/embed/${id}`
            : urlStr;

          return {
            id: typeof v === 'object' && v.id ? v.id : String(idx),
            title: typeof v === 'object' && v.title ? v.title : '',
            caption: typeof v === 'object' && v.caption ? v.caption : '',
            url: urlStr,
            embed: this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl)
          };
        });
      },
      error: (err) => console.error('Error al cargar publicaciones:', err)
    });
  }

  // =============================
  // CARGAR DOCUMENTOS
  // =============================
  cargarDocumentos() {
    this.http.get<any>(`${this.api}/justificantes`).subscribe({
      next: (res) => {
        const datos = res?.datos || [];

        this.documentos = datos.map((d: DocFromApi, idx: number) => {
          if (typeof d === 'string') {
            return { nombre: `Documento ${idx + 1}`, url: this.fixToAbsolute(d) };
          }

          const url = d.url || (d as any).ruta || '';
          return {
            nombre: d.nombre || `Documento ${idx + 1}`,
            url: this.fixToAbsolute(url)
          };
        });
      },
      error: () => console.warn('No se pudieron cargar justificantes (puede que no apliquen).')
    });
  }

  abrirDocumento(doc: { nombre: string; url: string }) {
    if (!doc?.url) return;
    window.open(doc.url, '_blank');
  }

  // =============================
  // UTILIDADES
  // =============================
  private fixToAbsolute(pathStr: string): string {
    if (!pathStr) return '';
    if (pathStr.startsWith('http')) return pathStr;
    if (pathStr.startsWith('/')) return this.baseApi + pathStr;
    return this.baseApi + '/' + pathStr.replace(/^\/+/, '');
  }

  extraerVideoId(url?: string): string {
    if (!url) return '';
    const reg = /(?:youtube\.com\/.*v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(reg);
    return match ? match[1] : '';
  }
}
