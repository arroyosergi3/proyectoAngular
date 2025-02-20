import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import {  Router, RouterLink } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  estado: boolean;
  descripcion: string;
  marca: string;
  ruta: string;
}
export interface Alquiler {
  id: string;
  id_producto: number;
  id_usuario : string;
  fecha_inicio: string;
  fecha_fin: string;
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

export interface Marca{
  id: string;
  nombre: string;
}
@Component({
  selector: 'app-backend',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.css'
})



export class BackendComponent implements OnInit{

  constructor( private apiservice: ApiService,private router: Router) {}

  nombreMarca ='';
  nombreProducto = '';
  precioProducto = '';
  descripcionProducto = '';
  idMarcaProducto ='';
  rutaProducto = '';
  precioNumber :number | undefined;
  idMarcaNumebr :number | undefined;
  productos: Producto[] = []
  alquileres: Alquiler[] = []
  usuarios: Usuario[] = []
  marcas: Marca[] = []

  insertarProducto(){
    this.precioNumber = Number.parseFloat(this.precioProducto);
    this.idMarcaNumebr = Number.parseFloat(this.idMarcaProducto);
    this.apiservice.insertProducto(this.nombreProducto, this.precioNumber, false, this.descripcionProducto, this.idMarcaNumebr, this.rutaProducto).subscribe
    ({
       next: (response) => {
        alert("Producto insertado con exito");

        setTimeout(() => {
          this.router.navigate(['/backend']);
        }, 2000);
      },
      error: (error) => {
        alert("HA OCURRIDO UN ERROR AL INSERTAR EL PRODUCTO");
      }
    });
  }


  insertarMarca(){
    this.apiservice.insertMarca(this.nombreMarca).subscribe({
      next: (response) => {
        alert("Marca insertada con exito");
        setTimeout(() => {
          this.router.navigate(['/backend']);
        }, 2000);
      },
      error: (error) => {
        alert("HA OCURRIDO UN ERROR AL INSERTAR LA MARCA");
      }
    });
  }
  ngOnInit(){
    // Obtener productos
    this.apiservice.getProductos().subscribe(
      (data) => {
        this.productos = data;  // Asignamos los productos obtenidos de la API

      },
      (error) => {
        console.log('Error al obtener los productos:', error);
      }
    );
    //Obtener alquiler
    this.apiservice.getAlquileres().subscribe(
      (data) => {
        this.alquileres = data;  // Asignamos los productos obtenidos de la API

      },
      (error) => {
        console.log('Error al obtener los productos:', error);
      }
    );
    //Obtener usuarios
    this.apiservice.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;  // Asignamos los productos obtenidos de la API

      },
      (error) => {
        console.log('Error al obtener los productos:', error);
      }
    );
    //Obtener marcas
    this.apiservice.getMarcas().subscribe(
      (data) => {
        this.marcas = data;
      },
      (error) => {
        console.log('Error al obtener los productos:', error);
      }
    );
  }
  @ViewChild('tablaProductos') tablaProductos!: ElementRef;
@ViewChild('tablaUsuarios') tablaUsuarios!: ElementRef;
@ViewChild('tablaAlquileres') tablaAlquileres!: ElementRef;
@ViewChild('tablaMarcas') tablaMarcas!: ElementRef;
@ViewChild('formularioMarca') formularioMarca!: ElementRef;
//@ViewChild('formularioProducto') formularioProducto!: ElementRef;
@ViewChild('formularioProducto', { static: false }) formularioProducto!: ElementRef;



mostrarTabla(tipo: string) {
  console.log("Mostrando tabla de:", tipo);

  if (tipo === 'productos' && this.tablaProductos) {
    this.tablaProductos.nativeElement.classList.remove('d-none');
    this.tablaUsuarios.nativeElement.classList.add('d-none');
    this.tablaMarcas.nativeElement.classList.add('d-none');
    this.tablaAlquileres.nativeElement.classList.add('d-none');
    this.formularioMarca.nativeElement.classList.add('d-none');
    this.formularioProducto.nativeElement.classList.add('d-none')
  }
  if (tipo === 'usuarios' && this.tablaUsuarios) {
    this.tablaUsuarios.nativeElement.classList.remove('d-none');
    this.tablaProductos.nativeElement.classList.add('d-none');
    this.tablaMarcas.nativeElement.classList.add('d-none');
    this.tablaAlquileres.nativeElement.classList.add('d-none');
    this.formularioMarca.nativeElement.classList.add('d-none');
    this.formularioProducto.nativeElement.classList.add('d-none')
  }
  if (tipo === 'alquileres' && this.tablaAlquileres) {
    this.tablaAlquileres.nativeElement.classList.remove('d-none');
    this.tablaProductos.nativeElement.classList.add('d-none');
    this.tablaMarcas.nativeElement.classList.add('d-none');
    this.tablaUsuarios.nativeElement.classList.add('d-none');
    this.formularioMarca.nativeElement.classList.add('d-none');
    this.formularioProducto.nativeElement.classList.add('d-none')
  }
  if (tipo === 'marcas' && this.tablaMarcas) {
    this.tablaMarcas.nativeElement.classList.remove('d-none');
    this.tablaProductos.nativeElement.classList.add('d-none');
    this.tablaUsuarios.nativeElement.classList.add('d-none');
    this.tablaAlquileres.nativeElement.classList.add('d-none');
    this.formularioMarca.nativeElement.classList.add('d-none');
    this.formularioProducto.nativeElement.classList.add('d-none')
  }
}

borrarUsuario(id: string){
this.apiservice.borrarUsuario(id).subscribe(
  (response) => {
    if (response.borrado === 'success') {
      alert("USUARIO BORRADO CON EXITO");
    }
    if (response.borrado === 'fail') {
      alert("USUARIO NO BORRADO");
    }
  },
)
}
borrarProducto(id: string){
this.apiservice.borrarProducto(id).subscribe(
  (response) => {
    if (response.borrado === 'success') {
      alert("PRODUCTO BORRADO CON EXITO");
    }
    if (response.borrado === 'fail') {
      alert("PRODUCTO NO BORRADO");
    }
  },
)
}
borrarMarca(id: string){
  this.apiservice.borrarMarca(id).subscribe(
    (response) => {
      if (response.borrado === 'success') {
        alert("MARCA BORRADA CON EXITO");
      }
      if (response.borrado === 'fail') {
        alert("MARCA NO BORRADA");
      }
    },
  )
  }

borrarAlquiler(id: string){
this.apiservice.borrarAlquiler(id).subscribe(
  (response) => {
    if (response.borrado === 'success') {
      alert("ALQUILER BORRADO CON EXITO");
    }
    if (response.borrado === 'fail') {
      alert("ALQUILER NO BORRADO");
    }
  },
)
}

anadirMarca(){

  this.tablaProductos.nativeElement.classList.add('d-none');
  this.tablaUsuarios.nativeElement.classList.add('d-none');
  this.tablaMarcas.nativeElement.classList.add('d-none');
  this.tablaAlquileres.nativeElement.classList.add('d-none');
  this.formularioMarca.nativeElement.classList.remove('d-none');
  this.formularioProducto.nativeElement.classList.add('d-none')
}

anadirProducto() {

  this.tablaProductos.nativeElement.classList.add('d-none');
  this.tablaUsuarios.nativeElement.classList.add('d-none');
  this.tablaMarcas.nativeElement.classList.add('d-none');
  this.tablaAlquileres.nativeElement.classList.add('d-none');

  this.formularioMarca.nativeElement.classList.add('d-none');
  this.formularioProducto.nativeElement.classList.remove('d-none')

}
}


