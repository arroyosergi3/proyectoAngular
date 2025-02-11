import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  estado: boolean;
  descripcion: string;
  marca: string;
  ruta: string;
}
export interface Alquiler {
  id: number;
  id_producto: number;
  id_usuario : string;
  fecha_inicio: string;
  fecha_fin: string;
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

export interface Marca{
  id: string;
  nombre: string;
}
@Component({
  selector: 'app-backend',
  imports: [CommonModule],
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.css'
})



export class BackendComponent implements OnInit{

  constructor(private apiservice: ApiService) { }

  productos: Producto[] = []
  alquileres: Alquiler[] = []
  usuarios: Usuario[] = []
  marcas: Marca[] = []

  ngOnInit(){
    // Obtener productos
    this.apiservice.getSaludo().subscribe(
      (data) => {
        this.productos = data;  // Asignamos los productos obtenidos de la API

      },
      (error) => {
        console.log('Error al obtener los productos:', error);
      }
    );
    /*
    //Obtener alquiler
    this.apiservice.getAlquileres().subscribe(
      (data) => {
        this.alquiler = data;  // Asignamos los productos obtenidos de la API

      },
      (error) => {
        console.log('Error al obtener los productos:', error);
      }
    );
    */
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

mostrarTabla(tipo: string) {
  console.log("Mostrando tabla de:", tipo);

  if (tipo === 'productos' && this.tablaProductos) {
    this.tablaProductos.nativeElement.classList.remove('d-none');
    this.tablaUsuarios.nativeElement.classList.add('d-none');
    this.tablaMarcas.nativeElement.classList.add('d-none');
    this.tablaAlquileres.nativeElement.classList.add('d-none');
  }
  if (tipo === 'usuarios' && this.tablaUsuarios) {
    this.tablaUsuarios.nativeElement.classList.remove('d-none');
    this.tablaProductos.nativeElement.classList.add('d-none');
    this.tablaMarcas.nativeElement.classList.add('d-none');
    this.tablaAlquileres.nativeElement.classList.add('d-none');
  }
  if (tipo === 'alquileres' && this.tablaAlquileres) {
    this.tablaAlquileres.nativeElement.classList.remove('d-none');
    this.tablaProductos.nativeElement.classList.add('d-none');
    this.tablaMarcas.nativeElement.classList.add('d-none');
    this.tablaUsuarios.nativeElement.classList.add('d-none');
  }
  if (tipo === 'marcas' && this.tablaMarcas) {
    this.tablaMarcas.nativeElement.classList.remove('d-none');
    this.tablaProductos.nativeElement.classList.add('d-none');
    this.tablaUsuarios.nativeElement.classList.add('d-none');
    this.tablaAlquileres.nativeElement.classList.add('d-none');
  }
}
}


