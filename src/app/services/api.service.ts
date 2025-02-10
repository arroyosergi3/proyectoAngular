import { HttpClient, HttpParams } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:9090/'; // URL de la API de Spring Boot

  constructor(private http: HttpClient) { }
  getSaludo(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl + "productos/obtener");
  }

  login(email: string, contrasena: string): Observable<any> {
    const body = { email, contrasena };
    return this.http.post(this.apiUrl + "usuario/autentica", body);
  }


  getMisProductos(id_usuario: string): Observable<any> {
    return this.http.post(this.apiUrl + "alquileres/misProductos", id_usuario);
  }

  // Método para obtener el id_usuario desde la sesión
  getUserIdFromSession(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/getUserId`);
  }
}
