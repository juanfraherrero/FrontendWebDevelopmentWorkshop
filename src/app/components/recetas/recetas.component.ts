import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


import Recipe from '../../interfaces/recipe';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})

export class RecetasComponent implements OnInit{
  pais:string = '';
  recetas : Recipe[] = [];

  constructor (private apiService: ApiService, private route: ActivatedRoute, private router:Router){

  }

  ngOnInit(): void {
    this.pais = this.route.snapshot.params["pais"]; //Obtengo el pais de la ruta

    this.apiService.getRecetasPais(this.pais).subscribe( (response: Recipe[]) => {
      // si la response está vacía (no encuentra nada)
      if (response !== undefined){
        this.recetas = response; 
      }else{
        this.router.navigate(['/']);
      }});
  }

}
