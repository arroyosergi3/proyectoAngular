import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
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
  selector: 'app-mis-productos',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-productos.component.html',
  styleUrl: './mis-productos.component.css'
})
export class MisProductosComponent {
  idUsuario: string = '';

    misProductos: Producto[] = []
    constructor(private apiservice: ApiService) { }
    ngOnInit() {
      this.apiservice.getMisProductos(this.idUsuario).subscribe(
        (data) => {
          this.misProductos = data;
        },
        (error) => {
          console.log('Error al obtener los productos:', error);
        }
      );
    }
}
