import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle',
  imports: [],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
@Input() producto: any;
}
