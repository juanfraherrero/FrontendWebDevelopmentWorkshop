import { Component, Input } from '@angular/core';

import Recipe from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent {
  
  @Input() receta : Recipe = {} as Recipe;
  @Input() nombrePais : string = '';

  constructor() { }

}
