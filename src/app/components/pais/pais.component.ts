import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss']
})
export class PaisComponent implements OnInit {
  recetas: any;
  @Input() nombrePais: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getRecetasPais(this.nombrePais).subscribe(
      (response: any) => {
        this.recetas = response[0].recetas; //Lo que devuelve es un atributo llamado recetas que adentro tiene un arreglo de recetas en si, por eso el agregado de .recetas
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
