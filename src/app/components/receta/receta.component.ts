import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent {

  @Input() nombreReceta: string = '';
  @Input() descripcionReceta: Array<string> = [];
  @Input() ingredientesReceta: Array<JSON> = [];
}
