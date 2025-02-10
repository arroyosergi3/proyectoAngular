import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { MisProductosComponent } from './componentes/mis-productos/mis-productos.component';

export const routes: Routes = [
  {path: '',component: PrincipalComponent},
  {path: 'registro',component: RegistroComponent},
  {path: 'login',component: LoginComponent},
  {path: 'misProductos',component: MisProductosComponent},
  { path: 'detalle/:id', component: DetalleComponent }
];
