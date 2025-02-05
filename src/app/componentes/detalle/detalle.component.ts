import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlquilarProductoComponent } from '../alquilar-producto-component/alquilar-producto-component.component';

@Component({
  selector: 'app-detalle',
  imports: [AlquilarProductoComponent],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit{
  productos = [
    {
      id: 1,
      nombre: "Bolso de lujo",
      precio: 1200.99,
      estado: true,
      descripcion: "Bolso de alta calidad, perfecto para ocasiones especiales.",
      marca: "Versaci",
      ruta: "1.png"
    },
    {
      id: 2,
      nombre: "Zapatos deportivos",
      precio: 99.99,
      estado: true,
      descripcion: "Zapatos cómodos y elegantes para todo tipo de actividades.",
      marca: "Diar",
      ruta: "2.png"
    },
    {
      id: 3,
      nombre: "Reloj de lujo",
      precio: 450.00,
      estado: false,
      descripcion: "Reloj de lujo con detalles en oro.",
      marca: "Gucco",
      ruta: "3.png"
    },
    {
      id: 4,
      nombre: "Chaqueta de cuero",
      precio: 299.50,
      estado: true,
      descripcion: "Chaqueta de cuero auténtico para climas fríos.",
      marca: "Chanal",
      ruta: "4.png"
    },
    {
      id: 5,
      nombre: "Gafas de sol",
      precio: 150.75,
      estado: true,
      descripcion: "Gafas de sol de diseño exclusivo.",
      marca: "Hermas",
      ruta: "5.png"
    }
  ];
  producto:any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Convertir a número
    this.producto = this.productos.find(prod => prod.id === id); // Buscar el producto

    //console.log('Producto seleccionado:', this.producto);
  }

}
