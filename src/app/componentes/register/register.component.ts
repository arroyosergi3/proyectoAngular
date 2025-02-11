import { ApiService } from './../../services/api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
      if (email) {
        this.email = email;
      }
      //console.log("EL EMAIL ES: ", this.email);
  }

    nombre = '';
    apellido= '';
    email= '';
    contrasena= '';
    contrasena2='';
    sexo= '';
    pais= '';
    rol= 'user';

  onSubmit() {
    if(this.contrasena==this.contrasena2){



    this.apiService.register(this.nombre, this.apellido, this.email, this.rol,this.contrasena, this.pais, this.sexo).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.successMessage = 'Usuario registrado correctamente. Redirigiendo...';
        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error en registro:', error);
        this.errorMessage = 'Error al registrar usuario. Inténtalo de nuevo.';
        this.successMessage = '';
      }
    });
  }else{
    alert("LAS CONTRASEÑAS NO COINCIDEN");
  }
}
}
