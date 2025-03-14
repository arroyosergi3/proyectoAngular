import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
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
export class EditProductoComponent implements OnInit {

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
      const id = String(this.route.snapshot.paramMap.get('id')); // Convertir a número
      if (!id) {
        alert("ID no válido en la URL");
        this.router.navigate(['/']); // Evita seguir si el id es inválido
        return;
      }
      this.apiService.getProductos().subscribe(
        (data) => {
          this.productos = data;
         // console.log("Productos obtenidos arsa:", this.productos); // Para depuración
          this.producto = this.productos.find(prod => prod.id == id); // Buscar el producto
          if (this.producto) {

        this.id = this.producto.id;
        this.nombre = this.producto.nombre;
        this.precio = this.producto.precio;
        this.estado = this.producto.estado;
        this.descripcion = this.producto.descripcion;
        this.id_marca = this.producto.marca;
        this.ruta = this.producto.ruta;
          }else{
            alert("OJITO QUE EL PRODUCTO ES UNDEFINED");
          }
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
         this.router.navigate(['/backend']); // Evita seguir si el id es inválido
        },
        (error) => {
          console.log('Error al actualizar el producto:', error);
        }

      );
    }


}
