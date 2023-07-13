import { Component, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

import Recipe from '../../interfaces/recipe';

@Component({
    selector: 'app-selectReceta',
    templateUrl: './selectReceta.component.html',
    styleUrls: ['./selectReceta.component.scss']
  })
export class SelectRecetaComponent {
    
    @Input() receta : Recipe = {} as Recipe;
    @Input() nombrePais : string = '';
  
    constructor(private apiService: ApiService, private router:Router) { }

    delete(){
      let cantRecetas: number;
      this.apiService.getRecetasPais(this.nombrePais).subscribe((response: Recipe[]) => {
      cantRecetas = response.length;
      this.apiService.deleteReceta(this.nombrePais, this.receta.nombre)
      .subscribe((): void => {
        if (cantRecetas <= 1){
          this.router.navigate(['/']);
        } else {
          window.location.reload();
        }})
      });
    }
}