import { Component, OnInit } from '@angular/core';
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
    numRows: number = 1;
    recetaModificada: Recipe = {
      nombre: '',
      descripcion: [] ,
      imagen: '',
      ingredientes: [],
      preparacion: [],
      consejos: []
    }

    constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}
    
    ngOnInit(): void {
      this.pais = this.route.snapshot.params["pais"];       //Obtengo el pais de la ruta
      this.nombreReceta = this.route.snapshot.params["receta"];   //Obtengo la receta de la ruta

    this.apiService.getReceta(this.pais, this.nombreReceta).subscribe( (response: Recipe) => {
      this.receta = response;
    })
    }

    crearParrafo(atributo: string){
      if (atributo == 'descripcion'){
        this.receta.descripcion.push('');
      } if (atributo == 'preparacion'){
        this.receta.preparacion.push('');
      } else {
        this.receta.consejos?.push('');
      }
    }

    eliminarParrafo(atributo:string): void{
      if (atributo == 'descripcion'){
        this.receta.descripcion.pop();
      } if (atributo == 'preparacion'){
        this.receta.preparacion.pop();
      } else {
        this.receta.consejos?.pop();
      }
    }

    crearIngr(){
      let ingredientes: Ingredient = {nombre:'', cantidad:'', opcional: true}
      this.receta.ingredientes.push(ingredientes);
    }

    eliminarIngr(){
      this.receta.ingredientes.pop();
    }

    actualizar(){
      let act : {
        nombre?: string,
        descripcion? : string[],
        imagen? : string,
        ingredientes? : Ingredient[],
        preparacion? : string[],
        consejos? : string[]
      } = {}
      if (this.recetaModificada.nombre){
        act["nombre"] = this.recetaModificada.nombre
      }
      this.apiService.updateReceta(this.pais, this.nombreReceta, act).subscribe((): void => {this.router.navigate(['/']);});
    }
}