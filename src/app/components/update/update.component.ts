import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

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
    formUpdate: FormGroup = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormArray([]),
      imagen: new FormControl(''),
      ingredientes: new FormArray<FormGroup>([]),
      preparacion: new FormArray([]),
      consejos: new FormArray([])
    })

    constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}
    
    ngOnInit(): void {
      this.pais = this.route.snapshot.params["pais"];       //Obtengo el pais de la ruta
      this.nombreReceta = this.route.snapshot.params["receta"];   //Obtengo la receta de la ruta

      this.apiService.getReceta(this.pais, this.nombreReceta).subscribe( (response: Recipe) => {
        this.receta = response;
        this.formUpdate.patchValue({
          nombre: this.receta.nombre
        });
        this.formUpdate.setControl('descripcion', new FormArray(this.receta.descripcion.map(parrafo => new FormControl(parrafo))))
        this.formUpdate.setControl('ingredientes', new FormArray(this.receta.ingredientes.map(ingrediente => new FormGroup({
                                                                                                              nombre: new FormControl(ingrediente.nombre),
                                                                                                              cantidad: new FormControl(ingrediente.cantidad),
                                                                                                              opcional: new FormControl(ingrediente.opcional)}))))
        this.formUpdate.setControl('preparacion', new FormArray(this.receta.preparacion.map(parrafo => new FormControl(parrafo))))
        this.formUpdate.setControl('consejos', new FormArray(this.receta.consejos.map(parrafo => new FormControl(parrafo))))
      })
      console.log(this.formUpdate)
    }

    //Getters

    get descripcion(){
      return this.formUpdate.get('descripcion') as FormArray;
    }

    get ingredientes(){
      return this.formUpdate.get('ingredientes') as FormArray<FormGroup>;
    }

    get preparacion(){
      return this.formUpdate.get('preparacion') as FormArray;
    }

    get consejos(){
      return this.formUpdate.get('consejos') as FormArray;
    }


    crearParrafo(atributo: string){
      
    }

    eliminarParrafo(atributo:string): void{
      
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
        if(array[i].length === 0 ){
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
        console.log(array[i]);
        if(array[i] === arrayOriginal[i]){
          i++;
        } else {
          iguales = false;
        }
      }
      return iguales;
    }

    actualizar(){
      /*let act : {
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
      this.apiService.updateReceta(this.pais, this.nombreReceta, act).subscribe((): void => {this.router.navigate(['/'+this.pais+'/'+this.nombreReceta]);});*/
    }
}