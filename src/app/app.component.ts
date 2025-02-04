import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadComponent } from './componentes/head/head.component';
import { FooterComponent } from './componentes/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeadComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoAngular';
}
