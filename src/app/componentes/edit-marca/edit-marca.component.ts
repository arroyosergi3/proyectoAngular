import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Marca } from '../principal/principal.component';

@Component({
  selector: 'app-edit-marca',
  imports: [],
  templateUrl: './edit-marca.component.html',
  styleUrl: './edit-marca.component.css'
})
export class EditMarcaComponent implements OnInit{
  marcas: Marca[] = []
  marca: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Convertir a número
    this.apiService.getMarcas().subscribe(
      (data) => {
        this.marcas = data;
        this.marca = this.marcas.find(prod => prod.id === id); // Buscar el producto
      },
      (error) => {
        console.log('Error al obtener los productos:', error);
      }
    );
  }


}
