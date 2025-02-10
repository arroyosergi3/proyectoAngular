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
export interface Alquiler {
  id: number;
  producto: Producto;
  fecha_inicio: Date;
  fecha_fin: Date;
}

@Component({
  selector: 'app-mis-productos',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-productos.component.html',
  styleUrl: './mis-productos.component.css'
})
export class MisProductosComponent {
     misAlquileres: Alquiler[] = []
    constructor(private apiservice: ApiService) { }
    /*
    ngOnInit() {
      this.apiservice.getMisProductos().subscribe(
        (data) => {
          this.misAlquileres = data;
          console.log("ALQUILERES MIOS:",this.misAlquileres);
        },
        (error) => {
          console.log('Error al obtener los productos:', error);
        }
      );
    }
      */
    ngOnInit() {
      this.apiservice.getMisProductos().subscribe(
        (alquileres) => {
          this.misAlquileres = alquileres;
          console.log("ALQUILERES MIOS:",this.misAlquileres);
        },
        (error) => {
          console.log('Error al obtener los alquileres:', error);
        }
      );
    }


}
