import { Routes } from '@angular/router';
import { HeadComponent } from './componentes/head/head.component';
import { PrincipalComponent } from './componentes/principal/principal.component';

export const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
  }
];
