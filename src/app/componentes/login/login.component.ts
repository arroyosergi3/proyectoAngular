import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';
  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit() {
    this.apiService.login(this.email, this.contrasena).subscribe(
      (response) => {
        if (response.result === 'ok') {
          const idUsuario = response.id_usuario;
          const rol = response.rol;
          if (idUsuario && rol) {
            this.apiService.setUsuario(idUsuario, rol);
          }
          document.cookie = `jwt=${response.jwt}; path=/`;
          this.router.navigate(['/misProductos']); // Redirige tras login exitoso
        }
        if(response.email != null){
          alert("Credenciales Incorrectas");
        }
        if (response.result === 'nullUser') {
          alert("Si, tet eiene que redirigir, y con tu email "+ this.email);
          this.router.navigate(['/register/'+this.email]);
        }
      },
      (error) => {
        console.error('Error en login', error);
      }
    );
  }
}
