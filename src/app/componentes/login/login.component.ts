import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';
  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    this.apiService.login(this.email, this.contrasena).subscribe(
      (response) => {
        console.log(response.id_usuario.toString()); // ⚠ Error aquí si `response` es undefined
        if (response.result === 'ok') {
          const idUsuario = response.id_usuario;
      const rol = response.rol;
      if (idUsuario && rol) {
        this.apiService.setUsuario(idUsuario, rol);
      }else{
      }
          document.cookie = `jwt=${response.jwt}; path=/`;
          //alert('Las credenciales si tan bien');
          this.router.navigate(['/misProductos']); // Redirige tras login exitoso
        } else {
          alert('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en login', error);
      }
    );
  }
}
