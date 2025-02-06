import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  estado: boolean;
  descripcion: string;
  marca: string;
  ruta: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:9090/productos/obtener'; // URL de la API de Spring Boot

  constructor(private http: HttpClient) { }
  getSaludo(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
