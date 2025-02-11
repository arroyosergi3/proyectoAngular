import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  estado: boolean;
  descripcion: string;
  marca: string;
  ruta: string;
}
export interface Usuario{
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  contrasena: string;
  pais: string;
  sexo: string;
}
export interface Marca {
  id: string;
  nombre: string;
}
export interface Alquiler {
  id: number;
  id_producto: number;
  id_usuario: string;
  fecha_inicio: string;
  fecha_fin: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static hayusuario: boolean;

  private apiUrl = 'http://localhost:9090/'; // URL de la API de Spring Boot

  constructor(private http: HttpClient, private router: Router) { }
  getSaludo(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl + "productos/obtener");
  }

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl + "marcas/obtener");
  }
  getAlquileres(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(this.apiUrl + "alquiler/obtener");
  }
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl + "usuario/obtener");
  }

  login(email: string, contrasena: string): Observable<any> {
    const body = { email, contrasena };
    return this.http.post<any>(this.apiUrl + "usuario/autentica", body);
  }

  register(nombre: string, apellido: string, email: string, rol: string, contrasena: string, pais: string, sexo: string): Observable<any> {
    const body = { nombre, apellido, email, rol, contrasena, pais, sexo };
    return this.http.post<any>(this.apiUrl + "usuario/anadirnuevo", body);
  }

  setUsuario(id: number, rol: string) {
    localStorage.setItem('id_usuario', id.toString());
    localStorage.setItem('rol', rol);
  }

  getIdUsuario(): number | null {

    const id = localStorage.getItem('id_usuario');
    // console.log("EL ID DEL USUARIO ES: ", id);
    return id ? parseInt(id, 10) : null;

  }

  // Obtener el rol del usuario autenticado desde localStorage
  getRolUsuario(): string  {
   var rol = localStorage.getItem('rol');
    if (rol) {
      return rol;
    }else{
      return 'ROL INVALIDO';
    }
  }

  getMisProductos(): Observable<any> {
    const idUsuario = this.getIdUsuario();
    if (!idUsuario) return new Observable(); // Retorna vacío si no hay usuario
    return this.http.post<Alquiler[]>(this.apiUrl + "alquileres/misProductos", { id_usuario: idUsuario });
  }
  // Método para obtener el id_usuario desde la sesión
  getUserIdFromSession(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/getUserId`);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl + '/productos/obtenerPorId', id);
  }

  isAutenticated(): boolean {
    if (this.cookieExists('jwt') != null) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    let rol = localStorage.getItem('rol');
    if (rol === 'admin') {
      return true;
    }else{
      return false;
    }
  }
  cookieExists(cookieName: string): boolean {
    const cookies = document.cookie;
    const cookieArray = cookies.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return true;
        }
    }
    return false;
}


  logOut() {
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('rol');
    this.setUsuario(0, "");
    this.deleteCookie('jwt');
    alert("Sesion cerrada");
    setTimeout(() => {
      this.router.navigate(['/']); // Redirige a la ruta principal
    }, 1000);
  }

  deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}
