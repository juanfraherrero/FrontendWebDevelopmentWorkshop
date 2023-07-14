import { Component, OnInit, NgModule } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute,Router } from '@angular/router';

import Recipe from '../../interfaces/recipe';
import Ingredient from 'src/app/interfaces/ingredient';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})


export class updateComponent implements OnInit{
    pais:string = '';
    nombreReceta : string = '';
    receta: Recipe = {} as Recipe;
    recetaModificada: Recipe = {} as Recipe;

    constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}
    
    ngOnInit(): void {
      this.pais = this.route.snapshot.params["pais"];       //Obtengo el pais de la ruta
      this.nombreReceta = this.route.snapshot.params["receta"];   //Obtengo la receta de la ruta

      this.apiService.getReceta(this.pais, this.nombreReceta).subscribe( (response: Recipe) => {
        this.receta = response;
        this.recetaModificada = JSON.parse(JSON.stringify(this.receta));
      })
    }

    crearParrafo(atributo: string){
      if (atributo == 'descripcion'){
        this.recetaModificada.descripcion.push('');
      } if (atributo == 'preparacion'){
        this.recetaModificada.preparacion.push('');
      } else {
        this.recetaModificada.consejos?.push('');
      }
    }

    eliminarParrafo(atributo:string): void{
      if (atributo == 'descripcion'){
        this.recetaModificada.descripcion.pop();
      } if (atributo == 'preparacion'){
        this.recetaModificada.preparacion.pop();
      } else {
        this.recetaModificada.consejos?.pop();
      }
    }

    crearIngr(){
      let ingredientes: Ingredient = {nombre:'', cantidad:'', opcional: true}
      this.receta.ingredientes.push(ingredientes);
    }

    eliminarIngr(){
      this.receta.ingredientes.pop();
    }

    verificarParrafos(array: string[], arrayOriginal: string[]): boolean{
      let tamanio: number = array.length;
      let i: number = 0;
      let iguales: boolean = true;
      while(i < tamanio){
        if(array[i] && array[i].length === 0 ){
          array.splice(i,1);
          tamanio--;
        } else {
          i++;
        }
      }
      const tamanioOri = arrayOriginal.length;
      if (tamanio !== tamanioOri) {iguales = false};
      i = 0;
      while(iguales && i < tamanio){
        if(array[i] === arrayOriginal[i]){
          i++;
        } else {
          iguales = false;
        }
      }
      return iguales;
    }

    actualizar(){
      let act : {
        nombre?: string,
        descripcion? : string[],
        imagen? : string,
        ingredientes? : Ingredient[],
        preparacion? : string[],
        consejos? : string[]
      } = {};
      if (this.recetaModificada.nombre !== this.receta.nombre){
        act.nombre = this.recetaModificada.nombre;
      }
      console.log(this.recetaModificada.descripcion);
      if (! this.verificarParrafos(this.recetaModificada.descripcion, this.receta.descripcion)){
        act.descripcion = this.recetaModificada.descripcion;
      }
      console.log(this.receta.descripcion);
      this.apiService.updateReceta(this.pais, this.nombreReceta, act).subscribe((): void => {this.router.navigate(['/'+this.pais+'/'+this.nombreReceta]);});
    }
}