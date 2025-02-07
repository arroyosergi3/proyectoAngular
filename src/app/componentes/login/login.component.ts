
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  contrasena: string = '';
  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    this.apiService.login(this.email, this.contrasena).subscribe(
      (response) => {
        if (response.result === 'ok') {
          document.cookie = `jwt=${response.jwt}; path=/`;
          this.router.navigate(['/']); // Redirige tras login exitoso
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
