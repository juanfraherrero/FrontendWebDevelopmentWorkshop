import { Component, Input, ViewChild } from '@angular/core';

import Recipe from '../../interfaces/recipe';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent {
  
  @ViewChild('recetaOptions') optionsRef!: any;
  @ViewChild('recetaButton') buttonRef!: any;

  @Input() receta : Recipe = {} as Recipe;
  @Input() nombrePais : string = '';
  verMenu: boolean = false;

  constructor(private apiService: ApiService, private router:Router) { }

  toggleMenu(){
    this.verMenu = !this.verMenu;
    console.log(this.buttonRef.nativeElement.classList);
    this.buttonRef.nativeElement.classList.toggle('hidden');
    // console.log(this.optionsRef.nativeElement);
    this.optionsRef.nativeElement.classList.toggle('hidden');
  }

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
  } ) }
}
