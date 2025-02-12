import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alquilar-producto-component',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './alquilar-producto-component.component.html',
  styleUrl: './alquilar-producto-component.component.css'
})
export class AlquilarProductoComponent implements OnInit{
  formulario: FormGroup;
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
  producto: any;
  ngOnInit(): void {
    this.producto = this.productos.find((producto) => producto.id === 1);
    if (this.producto) {
      this.formulario.patchValue({
        id: this.producto.id,
        precio: this.producto.precio
      });
    }
  }

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      id: [''], // Campo oculto
      precio: [''], // Campo oculto
      inicio: ['', Validators.required], // Fecha de inicio
      fin: ['', Validators.required], // Fecha de fin
    }, { validators: this.validarFechas }); // Validador personalizado
  }

  // Validador personalizado para comparar fechas
  validarFechas(form: FormGroup) {

    const inicio = form.get('inicio')?.value;
    const fin = form.get('fin')?.value;

    if (inicio && fin) {
      const fechaInicio = new Date(inicio);
      const fechaFin = new Date(fin);

      if (fechaInicio > fechaFin) {
        return { fechaInvalida: true }; // Retorna un error si la fecha de inicio es mayor que la de fin
      }
    }
    return null; // No hay error
  }

  onSubmit() {

    var $error = document.getElementById('error');
    if (this.formulario.valid) {
      if ($error != null) {
        $error.style.display = "none";
      }
      console.log('Formulario válido', this.formulario.value);
    } else {

      if ($error != null) {
        $error.style.display = "block";
      }

      console.log('Formulario inválido');
    }
  }
}

