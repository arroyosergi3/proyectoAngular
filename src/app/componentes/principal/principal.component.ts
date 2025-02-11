import { ApiService, Marca } from './../../services/api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  estado: boolean;
  descripcion: string;
  marca: string;
  ruta: string;
}

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {

  rol = '';
  constructor(private apiservice: ApiService) { }
  productosJson: Producto[] = [];
  marcas: Marca[] =[] ;
  ngOnInit() {
    this.rol = this.apiservice.getRolUsuario();

    this.apiservice.getSaludo().subscribe(
      (data) => {
        this.productosJson = data;  // Asignamos los productos obtenidos de la API
      },
      (error) => {
        console.log('Error al obtener los productos:', error);
      }

    );

    this.apiservice.getMarcas().subscribe(
      (data) => {
        this.marcas = data;
        console.log(this.marcas);
      },
      (error) => {
        console.log('Error al obtener los productos:', error);
      }
    );
     console.log("EL ROL DEL USUARIO ES: ", this.rol);
  }

}
