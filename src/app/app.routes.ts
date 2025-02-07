import { Routes } from '@angular/router';
import { HeadComponent } from './componentes/head/head.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';

export const routes: Routes = [
  {path: '',component: PrincipalComponent},
  {path: 'registro',component: RegistroComponent},
  {path: 'login',component: LoginComponent},
  { path: 'detalle/:id', component: DetalleComponent }
];
