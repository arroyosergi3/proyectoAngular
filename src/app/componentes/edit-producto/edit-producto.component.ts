import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Router } from 'express';
import { Producto } from '../principal/principal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-producto.component.html',
  styleUrl: './edit-producto.component.css'
})
export class EditProductoComponent {

  productos: Producto[] = []
    producto: any;
    id : any;
    nombre : any;
    precio : any;
    estado : any;
    descripcion : any;
    id_marca : any;
    ruta : any;
    constructor(private route: ActivatedRoute, private apiService: ApiService, private router:Router) {}
    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id'); // Convertir a número
      this.apiService.getSaludo().subscribe(
        (data) => {
          this.productos = data;
          this.producto = this.productos.find(prod => prod.id == id); // Buscar el producto
        this.id = this.producto.id;
        this.nombre = this.producto.nombre;
        this.precio = this.producto.precio;
        this.estado = this.producto.estado;
        this.descripcion = this.producto.descripcion;
        this.id_marca = this.producto.id_marca;
        this.ruta = this.producto.ruta;
        },
        (error) => {
          console.log('Error al obtener los productos:', error);
        }
      );
    }
  
    onSubmit(){
      this.apiService.updateProducto(this.id, this.nombre, this.precio, this.estado, this.descripcion, this.id_marca, this.ruta).subscribe(
        (response) => {
         alert(response.message);
        },
        (error) => {
          console.log('Error al actualizar el producto:', error);
        }
  
      );
    }
  

}
