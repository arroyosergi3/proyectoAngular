import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Alquiler } from '../backend/backend.component';

@Component({
  selector: 'app-edit-alquiler',
  imports: [],
  templateUrl: './edit-alquiler.component.html',
  styleUrl: './edit-alquiler.component.css'
})
export class EditAlquilerComponent {

   alquileres: Alquiler[] = []
    alquiler: any;
    id : any;
    id_usuario : any;
    id_producto : any;
    fecha_inicio : any;
    fecha_fin : any;
    constructor(private route: ActivatedRoute, private apiService: ApiService, private router:Router) {

    }
    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id'); // Convertir a número
      this.apiService.getAlquileres().subscribe(
        (data) => {
          this.alquileres = data;
          this.alquiler = this.alquileres.find(prod => prod.id == id); // Buscar el producto
        this.id = this.alquiler.id;
        this.id_usuario = this.alquiler.id_usuario;
        this.id_producto = this.alquiler.id_producto;
        this.fecha_inicio = this.alquiler.fecha_inicio;
        this.fecha_fin = this.alquiler.fecha_fin;
        },
        (error) => {
          console.log('Error al obtener los productos:', error);
        }
      );
    }

    onSubmit(){
      this.apiService.updateAlquiler(this.id, this.id_usuario, this.id_producto, this.fecha_inicio, this.fecha_fin).subscribe(
        (response) => {
         alert(response.message);
         this.router.navigate(['/backend']); // Evita seguir si el id es inválido
        },
        (error) => {
          console.log('Error al actualizar la marca:', error);
        }

      );
    }

}
