import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common'

import Recipe from '../../interfaces/recipe';
import Ingredient from 'src/app/interfaces/ingredient';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {
    pais:string = '';
    recetaNueva: Recipe = {} as Recipe;
    formUpdate: FormGroup = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormArray([]),
      imagen: new FormControl(''),
      ingredientes: new FormArray<FormGroup>([]),
      preparacion: new FormArray([]),
      consejos: new FormArray([])
    })

    constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private location: Location) {}
    
    ngOnInit(): void {
      this.pais = this.route.snapshot.params["pais"];       //Obtengo el pais de la ruta
    }

    // Getters de los array del form

    get descripcion(){
      return this.formUpdate.get('descripcion') as FormArray;
    }

    get imagen(){
      return this.formUpdate.get('imagen') as FormControl;
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

    // Creacion y eliminacion de parrafos e Ingredientes

    crearParrafo(atributo: string){
      if (atributo === "descripcion"){
        this.descripcion.push(new FormControl(''));
      } else if (atributo === "preparacion"){
        this.preparacion.push(new FormControl(''));
      } else {
        this.consejos.push(new FormControl(''));
      }
    }

    eliminarParrafo(atributo: string): void{
      if (atributo === "descripcion"){
        this.descripcion.removeAt(this.descripcion.length-1);
      } else if (atributo === "preparacion"){
        this.preparacion.removeAt(this.preparacion.length-1);
      } else {
        this.consejos.removeAt(this.consejos.length-1);
      }
    }

    crearIngr(){
      const nuevoIngrediente = new FormGroup({nombre: new FormControl(''), cantidad: new FormControl(''), opcional: new FormControl(true)}); 
      this.ingredientes.push(nuevoIngrediente);
    }

    eliminarIngr(){
      this.ingredientes.removeAt(this.ingredientes.length-1);
    }

    crearReceta(){
      this.recetaNueva.nombre = this.formUpdate.get('nombre')?.value;
      this.recetaNueva.descripcion = this.formUpdate.get('descripcion')?.value;
      this.recetaNueva.imagen = this.formUpdate.get('imagen')?.value;
      this.recetaNueva.ingredientes = this.formUpdate.get('ingredientes')?.value;
      this.recetaNueva.preparacion = this.formUpdate.get('preparacion')?.value;
      this.recetaNueva.consejos = this.formUpdate.get('consejos')?.value;
      this.apiService.insertReceta(this.pais, this.recetaNueva).subscribe((): void => {
          this.router.navigate(['/'+this.pais]);
      });
    }

    // Funcion volver

    goBack(){
      this.location.back();
    }

}
