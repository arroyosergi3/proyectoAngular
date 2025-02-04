import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {

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

  constructor() { }
  ngOnInit() {
  }

}
