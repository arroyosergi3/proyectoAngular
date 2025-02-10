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
    return this.http.post<any>(this.apiUrl + "usuario/autentica", body);
  }

  setUsuario(id: number, rol: string) {
    localStorage.setItem('id_usuario', id.toString());
    localStorage.setItem('rol', rol);
  }

  getIdUsuario(): number | null {
    const id = localStorage.getItem('id_usuario');
    console.log("EL ID DEL USUARIO ES: ", id);
    return id ? parseInt(id, 10) : null;

  }

  // Obtener el rol del usuario autenticado desde localStorage
  getRolUsuario(): string | null {
    console.log("EL ROL DEL USUARIO ES ", localStorage.getItem('rol'));
    return localStorage.getItem('rol');
  }

  getMisProductos(): Observable<any> {
    const idUsuario = this.getIdUsuario();
    if (!idUsuario) return new Observable(); // Retorna vacío si no hay usuario
    return this.http.post(this.apiUrl + "alquileres/misProductos", { id_usuario: idUsuario });
  }
  // Método para obtener el id_usuario desde la sesión
  getUserIdFromSession(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/getUserId`);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`URL_DEL_BACKEND/productos/${id}`);
  }

}
