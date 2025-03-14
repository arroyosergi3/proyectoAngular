
import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { LoginComponent } from './componentes/login/login.component';
import { MisProductosComponent } from './componentes/mis-productos/mis-productos.component';
import { RegisterComponent } from './componentes/register/register.component';
import { authGuard } from './guards/auth.guard';
import { BackendComponent } from './componentes/backend/backend.component';
import { adminGuard } from './guards/admin.guard';
import { EditMarcaComponent } from './componentes/edit-marca/edit-marca.component';
import { EditProductoComponent } from './componentes/edit-producto/edit-producto.component';
import { EditUsuarioComponent } from './componentes/edit-usuario/edit-usuario.component';
import { EditAlquilerComponent } from './componentes/edit-alquiler/edit-alquiler.component';

export const routes: Routes = [
  {path: '',component: PrincipalComponent},
  {path: 'backend',component: BackendComponent, canActivate: [adminGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'register/:email',component: RegisterComponent},
  {path: 'misProductos',component: MisProductosComponent, canActivate: [authGuard]},
  { path: 'detalle/:id', component: DetalleComponent, canActivate: [authGuard] },
  { path: 'editMarca/:id', component: EditMarcaComponent , canActivate: [adminGuard]},
  { path: 'editUsuario/:id', component: EditUsuarioComponent , canActivate: [adminGuard]},
  { path: 'editAlquiler/:id', component: EditAlquilerComponent , canActivate: [adminGuard]},
  { path: 'editProducto/:id', component: EditProductoComponent , canActivate: [adminGuard]}
];
