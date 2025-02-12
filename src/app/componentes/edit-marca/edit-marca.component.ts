import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Marca } from '../principal/principal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-marca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-marca.component.html',
  styleUrl: './edit-marca.component.css'
})
export class EditMarcaComponent implements OnInit{
  marcas: Marca[] = []
  marca: any;
  id : any;
  nombre : any;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router:Router) {

  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Convertir a número
    this.apiService.getMarcas().subscribe(
      (data) => {
        this.marcas = data;
        this.marca = this.marcas.find(prod => prod.id == id); // Buscar el producto
      this.id = this.marca.id;
      this.nombre = this.marca.nombre;
      },
      (error) => {
        console.log('Error al obtener los productos:', error);
      }
    );
  }

  onSubmit(){
    this.apiService.updateMarca(this.id, this.nombre).subscribe(
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
