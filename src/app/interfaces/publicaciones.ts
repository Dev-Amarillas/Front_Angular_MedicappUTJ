export interface Publicaciones {
  titulo: string;
  descripcion: string;
  fecha: string;
  autor: string;
  imagenes: string[]; // jamás null
  videos: string[];   // jamás null
}
