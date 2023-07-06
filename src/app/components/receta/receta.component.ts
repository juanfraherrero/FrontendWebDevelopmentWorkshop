import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent implements OnInit{
  receta: any;
  @Input() nombreReceta: string = '';

  constructor(private apiService: ApiService) { }

    ngOnInit(): void {
    this.apiService.getReceta(this.nombreReceta).subscribe(
      (response: any) => {
        this.receta = response[0].recetas; //Lo que devuelve es un atributo llamado recetas que adentro tiene un arreglo de recetas en si, por eso el agregado de .recetas
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
