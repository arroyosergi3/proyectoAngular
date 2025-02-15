import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  estado: boolean;
  descripcion: string;
  marca: string;
  ruta: string;
}
export interface Usuario{
  id: string;
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
  id: string;
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
  getProductos(): Observable<Producto[]> {
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
  borrarUsuario(id: string): Observable<any> {
    const body = { id: id }; // Envía un objeto JSON con la propiedad "id"
    return this.http.post(this.apiUrl + "usuario/borrar1", body);
  }
  borrarProducto(id: string): Observable<any> {
    const body = { id: id }; // Envía un objeto JSON con la propiedad "id"
    return this.http.post(this.apiUrl + "productos/borrar1", body);
  }
  borrarMarca(id: string): Observable<any> {
    const body = { id: id }; // Envía un objeto JSON con la propiedad "id"
    return this.http.post(this.apiUrl + "marcas/borrar1", body);
  }
  borrarAlquiler(id: string): Observable<any> {
    const body = { id: id }; // Envía un objeto JSON con la propiedad "id"
    return this.http.post(this.apiUrl + "alquiler/borrar1", body);
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
    if (typeof window !== 'undefined') {
    localStorage.setItem('id_usuario', id.toString());
    localStorage.setItem('rol', rol);
  }
}

  getIdUsuario(): number | null {
    if (typeof window !== 'undefined') {

      const id = localStorage.getItem('id_usuario');
      return id ? parseInt(id, 10) : null;
    }else{
      return null;
    }

  }

  // Obtener el rol del usuario autenticado desde localStorage
  getRolUsuario(): string  {
    if (typeof window !== 'undefined') {
   var rol = localStorage.getItem('rol');
  }else{
    rol = 'cliente';
  }
    if (rol) {
      return rol;
    }else{
      return 'ROL INVALIDO';
    }
  }

  getMisProductos(): Observable<any> {
    const idUsuario = this.getIdUsuario();
    if (!idUsuario) return new Observable(); // Retorna vacío si no hay usuario
    return this.http.post<Alquiler[]>(this.apiUrl + "alquiler/misProductos", { id_usuario: idUsuario });
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

  cookieExists(cookieName: string): boolean {
    if (typeof window !== 'undefined') {

    const cookies = document.cookie;
    const cookieArray = cookies.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return true;
        }
    }
    return false;
    }else{
      return false;
    }

}

isAdmin(): boolean {
  if (typeof window !== 'undefined') {
    let rol = localStorage.getItem('rol');
  if (rol === 'admin') {
    return true;
  }else{
    return false;
  }
  }else{
    return false;
  }

}

  logOut() {
    if (typeof window !== 'undefined') {

    localStorage.removeItem('id_usuario');
    localStorage.removeItem('rol');
    }
    this.setUsuario(0, "");
    this.deleteCookie('jwt');
    alert("Sesion cerrada");
    setTimeout(() => {
      this.router.navigate(['/']); // Redirige a la ruta principal
    }, 1000);
  }

  deleteCookie(name: string): void {
    if (typeof window !== 'undefined') {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }

  }

  updateMarca(id: string, nombre:string){
    const body = { id, nombre };
    return this.http.post<any>(this.apiUrl + "marcas/actualizar", body);
  }
  insertMarca( nombre:string){
    const body = { nombre };
    return this.http.post<any>(this.apiUrl + "marcas/anadirnuevo  ", body);
  }
  insertProducto( nombre:string, precio: number, estado:boolean, descripcion: string, id_marca: number, ruta: string){
    const body = { nombre, precio, estado, descripcion, id_marca, ruta };
    return this.http.post<any>(this.apiUrl + "productos/anadirnuevo  ", body);
  }
  updateUsuario(id: string, nombre:string, apellido:string, email:string, rol:string, contrasena:string, pais:string, sexo:string){
    const body = { id, nombre, apellido, email, rol, contrasena, pais, sexo };
    return this.http.post<any>(this.apiUrl + "usuario/actualizar", body);
  }
  updateProducto(id: string, nombre:string, precio:number, estado:boolean, descripcion:string, marca:string,ruta:string,){
    const body = { id, nombre, precio, estado, descripcion, marca, ruta };
    return this.http.post<any>(this.apiUrl + "productos/actualizar", body);
  }
  updateAlquiler(id: string, id_usuario:string, id_producto:string, fecha_inicio:string, fecha_fin:string){
    const body = { id, id_usuario, id_producto, fecha_inicio, fecha_fin };
    return this.http.post<any>(this.apiUrl + "alquiler/actualizar", body);
  }

  comprobarIsAlquilado(payload : any): Observable<any> {
    const body = { payload };
    return this.http.post<any>(this.apiUrl + "alquiler/estaAlquilado", body);
  }
}
