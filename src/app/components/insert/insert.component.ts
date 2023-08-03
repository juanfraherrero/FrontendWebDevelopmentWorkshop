import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common'

import Recipe from '../../interfaces/recipe';
import Ingredient from 'src/app/interfaces/ingredient';
import Country from '../../interfaces/country';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {
    pais:string = '';
    recetaNueva: Recipe = {} as Recipe;
    paisNuevo: Country = {} as Country;
    paisesAPI : Country[] = [];
    selectedPais: String = 'Selecciona un país'; // Valor inicial para el contenido del select
    otroPais: Boolean = false;

    submitted:boolean = false;
    itemValids:boolean = true;
    isSelectedCountry: boolean = true;
    isDescription: boolean = true;
    isingredient: boolean = true;
    isPreparation: boolean = true;


    formUpdate: FormGroup = new FormGroup({
      nombrePais: new FormControl(''),
      bandera: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormArray([],[Validators.required]),
      imagen: new FormControl('', Validators.required),
      ingredientes: new FormArray<FormGroup>([],[Validators.required]),
      preparacion: new FormArray([],[Validators.required]),
      consejos: new FormArray([])
    })

    constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private location: Location) {}
    
    ngOnInit(): void {
      this.pais = this.route.snapshot.params["pais"];       //Obtengo el pais de la ruta
      this.apiService.getPaises().subscribe( (response: Country[]) => {
        this.paisesAPI = response;
      }
    );
    }

    ngAfterViewInit(): void {
      const select = document.querySelector<HTMLDivElement>('#select');
      const opciones = document.querySelector<HTMLDivElement>('#opciones');
      const contenidoSelect = document.querySelector<HTMLDivElement>('#select .contenido-select');
      const hiddenInput = document.querySelector<HTMLInputElement>('#inputSelect');
  
      if (select && opciones && contenidoSelect && hiddenInput) {
        document.querySelectorAll<HTMLDivElement>('#opciones > .opcion').forEach((opcion) => {
          opcion.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            contenidoSelect.innerHTML = (e.currentTarget as HTMLDivElement).innerHTML;
            select.classList.toggle('active');
            opciones.classList.toggle('active');
            hiddenInput.value = (e.currentTarget as HTMLDivElement).querySelector('.titulo')?.textContent || '';
          });
        });
        select.addEventListener('click', () => {
          select.classList.toggle('active');
          opciones.classList.toggle('active');
        });
        opciones.addEventListener('click', () => {
          select.classList.toggle('active');
          opciones.classList.toggle('active');
        });
      }
    }

    valorInput(nombrePais: String, event: Event){
      event.preventDefault(); // Evitar la redirección predeterminada del enlace <a>
      this.selectedPais = nombrePais;
      this.isSelectedCountry = true;
    }

    insertarPaisNuevo(){
      this.otroPais = true;
      this.formUpdate?.get('nombrePais')?.setValidators(Validators.required);
      this.formUpdate?.get('bandera')?.setValidators(Validators.required);
    }

    // Getters de los array del form

    get nombrePais(){
      return this.formUpdate.get('nombrePais') as FormControl;
    }

    get bandera(){
      return this.formUpdate.get('bandera') as FormControl;
    }

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
        this.descripcion.push(new FormControl('', Validators.required));
      } else if (atributo === "preparacion"){
        this.preparacion.push(new FormControl('' , Validators.required));
      } else {
        this.consejos.push(new FormControl('', Validators.required));
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
      this.submitted = true;
      console.log(this.selectedPais.toLowerCase());
      console.log(this.selectedPais.toLowerCase() == 'Selecciona un país'.toLowerCase());
      
      if (!this.formUpdate.valid || (this.selectedPais.toLowerCase() === 'Selecciona un país'.toLowerCase())) { // checkeamos que sea valido el formulario
        if(this.selectedPais.toLowerCase() === 'Selecciona un país'.toLowerCase()){
          this.isSelectedCountry = false;
        }
        return;
      }
      else{
          this.recetaNueva.nombre = this.formUpdate.get('nombre')?.value;
          this.recetaNueva.descripcion = this.formUpdate.get('descripcion')?.value;
          this.recetaNueva.imagen = this.formUpdate.get('imagen')?.value;
          this.recetaNueva.ingredientes = this.formUpdate.get('ingredientes')?.value;
          this.recetaNueva.preparacion = this.formUpdate.get('preparacion')?.value;
          this.recetaNueva.consejos = this.formUpdate.get('consejos')?.value;
        if (!this.otroPais){
          this.apiService.insertReceta(this.selectedPais, this.recetaNueva).subscribe((): void => {
            this.router.navigate(['/'+this.selectedPais]);
          });
        } else {
          const recetas : Recipe[] = [];
          recetas.push(this.recetaNueva);
          this.paisNuevo.nombre = this.formUpdate.get('nombrePais')?.value;
          this.paisNuevo.bandera = this.formUpdate.get('bandera')?.value;
          this.paisNuevo.recetas = recetas;
          console.log(this.paisNuevo);
          this.apiService.insertPais(this.paisNuevo).subscribe((): void => {
            this.router.navigate(['/']);
          });
        }
      }
    }

    // Funcion volver

    goBack(){
      this.location.back();
    }

}
