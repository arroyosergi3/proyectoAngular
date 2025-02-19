import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../principal/principal.component';

@Component({
  selector: 'app-alquilar-producto-component',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './alquilar-producto-component.component.html',
  styleUrl: './alquilar-producto-component.component.css',
})
export class AlquilarProductoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formulario = this.fb.group(
      {
        id_producto: [''], // Campo oculto
        precio: [''], // Campo oculto
        fecha_inicio: ['', Validators.required], // Fecha de inicio
        fecha_fin: ['', Validators.required], // Fecha de fin
      },
      { validators: this.validarFechas }
    ); // Validador personalizado
  }

  formulario: FormGroup;

  productos: Producto[] = [];
  producto: any;
  idUsuario: any;
  id_producto: any;
  fecha_inicio: any;
  fecha_fin: any;
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.idUsuario = localStorage.getItem('id_usuario');
    const id = this.route.snapshot.paramMap.get('id'); // Convertir a número
    this.apiService.getProductos().subscribe(
      (response: any) => {
        this.productos = response;
        this.producto = this.productos.find((producto) => producto.id == id);
        if (this.producto) {
          this.formulario.patchValue({
            id_producto: this.producto.id,
            precio: this.producto.precio,
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
    }

  }

  // Validador personalizado para comparar fechas
  validarFechas(form: FormGroup) {
    const inicio = form.get('fecha_inicio')?.value;
    const fin = form.get('fecha_fin')?.value;

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
    if (this.formulario.valid) {
      // Extraer solo los valores necesarios
      let { id_producto, fecha_inicio, fecha_fin } = this.formulario.value;

      // Convertir `id_producto` a string
      id_producto = String(id_producto);


      this.apiService.comprobarIsAlquilado(id_producto, fecha_inicio, fecha_fin).subscribe(
        (response) => {
          //console.log('estoy en response');
          if (response.alquilado == 'true') {
            alert('Lo sentimos, este producto ya está alquilado en esa fecha');
          }
          if (response.alquilado == 'false') {
            //console.log("El producto está disponible para alquilar");
            this.apiService.insertAlquiler(id_producto, this.idUsuario, fecha_inicio, fecha_fin).subscribe(
              (response) => {
                if(response.bien != null){
                  alert("ha ido bien")
                }
                if(response.mal != null){
                  alert(response.mal)
                }
              },
              (error) => {
                alert('HA OCURRIDO UN ERROR AL ALQUILAR EL PRODUCTO');
              }
            )
          }
          if (response.error == 'null') {
            alert('EL ID DE PRODUCTO ES NULL');
          }
          if(response.error == "id_producto no es un número válido"){
            alert('EL ID DE PRODUCTO NO ES UN NUERO VÁLIDO');
          }

        },
        (error) => {
          console.error('ERROR AL COMPROBAR SI ESTÁ ALQUILADO:', error);
        }
      );
    } else {
      alert('Formulario inválido');
    }
  }
}
