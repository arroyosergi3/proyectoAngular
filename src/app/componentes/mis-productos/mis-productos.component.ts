import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
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
  id_producto: string;
  fecha_inicio: string;
  fecha_fin: string;
}

@Component({
  selector: 'app-mis-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-productos.component.html',
  styleUrl: './mis-productos.component.css'
})
export class MisProductosComponent {
  misAlquileres: Alquiler[] = []
  alquileresPasados: Alquiler[] = []
  productos: Producto[] = []
    constructor(private apiservice: ApiService) { }


    ngOnInit() {

      /*
      this.apiservice.getMisProductos().subscribe(
        (data) => {
          this.misAlquileres = data;
          console.log("ALQUILERES MIOS:",this.misAlquileres);
        },
        (error) => {
          console.log('Error al obtener los productos:', error);
        }
      );
*/
      this.apiservice.getMisProductos().subscribe(
        (alquileres : Alquiler[]) => {
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);

      //console.log("FECHA DE HOY: ", hoy);

      // Filtrar alquileres activos y vencidos correctamente
      this.misAlquileres = alquileres.filter((alquiler) => {
        const fechaFin = new Date(alquiler.fecha_fin);
        return fechaFin >= hoy && alquiler.fecha_fin;  // Verifica que 'fecha_fin' exista
      });

      this.alquileresPasados = alquileres.filter((alquiler) => {
        const fechaFin = new Date(alquiler.fecha_fin);
        return fechaFin < hoy && alquiler.fecha_fin;
      });



        },
        (error) => {
          console.log('Error al obtener los alquileres:', error);
        }
      );
      this.apiservice.getProductos().subscribe(
        (data) => {
          this.productos = data;  // Asignamos los productos obtenidos de la API

        },
        (error) => {
          console.log('Error al obtener los productos:', error);
        }
      );

    }


}
