import { Component , OnInit} from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import Recipe from '../../interfaces/recipe';

@Component({
  selector: 'app-info-receta',
  templateUrl: './info-receta.component.html',
  styleUrls: ['./info-receta.component.scss']
})
export class InfoRecetaComponent implements OnInit {
  pais:string = '';
  nombreReceta : string = '';
  receta : Recipe = {} as Recipe;
  constructor (private apiService: ApiService, private route: ActivatedRoute, private router:Router){
    
  }

  ngOnInit(): void {

    this.pais = this.route.snapshot.params["pais"];       //Obtengo el pais de la ruta
    this.nombreReceta = this.route.snapshot.params["receta"];   //Obtengo la receta de la ruta

    this.apiService.getReceta(this.pais, this.nombreReceta).subscribe( (response: {recetas:Recipe[]}[]) => {
      this.receta = response[0].recetas[0];
    })
  }

  activacionUpdate(){
    console.log("Activacion update");
  }

  delete() {
    this.apiService.deleteReceta(this.pais, this.nombreReceta)
      .subscribe((response: string) => {
        console.log(response);
        this.router.navigate(['/' + this.pais]);
      })

      
  }
}
