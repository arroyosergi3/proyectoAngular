import { RenderMode, ServerRoute } from '@angular/ssr';
import { HeadComponent } from './componentes/head/head.component';

export const serverRoutes: ServerRoute[] = [

  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
