import { Component, OnInit } from '@angular/core';
import { Usuario } from '../backend/backend.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-usuario',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export class EditUsuarioComponent implements OnInit{

  productos: Usuario[] = []
    usuario: any;
    id : any;
    nombre : any;
    apellido : any;
    email : any;
    sexo : any;
    pais : any;
    contrasena : any;
    rol : any;



    constructor(private route: ActivatedRoute, private apiService: ApiService, private router:Router) {}
    ngOnInit() {
      const id = String(this.route.snapshot.paramMap.get('id')); // Convertir a número
      if (!id) {
        alert("ID no válido en la URL");
        this.router.navigate(['/']); // Evita seguir si el id es inválido
        return;
      }
      this.apiService.getUsuarios().subscribe(
        (data) => {
          this.productos = data;
         // console.log("Productos obtenidos arsa:", this.productos); // Para depuración
          this.usuario = this.productos.find(prod => prod.id == id); // Buscar el producto
          if (this.usuario) {

        this.id = this.usuario.id;
        this.nombre = this.usuario.nombre;
        this.apellido = this.usuario.apellido;
        this.email = this.usuario.email;
        this.sexo = this.usuario.sexo;
        this.pais = this.usuario.pais;
        this.rol = this.usuario.rol;
        this.contrasena = this.usuario.contrasena;
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
      this.apiService.updateUsuario(this.id, this.nombre, this.apellido, this.email, this.rol, this.contrasena, this.pais, this.sexo).subscribe(
        (response) => {
         alert(response.message);
         this.router.navigate(['/backend']); // Evita seguir si el id es inválido
        },
        (error) => {
          console.log('Error al actualizar el usuario:', error);
        }

      );
    }

}
