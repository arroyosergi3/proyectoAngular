import { ApiService } from './../../services/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlquilarProductoComponent } from '../alquilar-producto-component/alquilar-producto-component.component';
export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  estado: boolean;
  descripcion: string;
  marca: string;
  ruta: string;
}
@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [AlquilarProductoComponent],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})

export class DetalleComponent implements OnInit{
   productosJson: Producto[] = []
  producto:any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Convertir a número
    this.apiService.getSaludo().subscribe(
      (data) => {
        this.productosJson = data;
        this.producto = this.productosJson.find(prod => prod.id === id); // Buscar el producto
      },
      (error) => {
        console.log('Error al obtener los productos:', error);
      }
    );



  }

}
