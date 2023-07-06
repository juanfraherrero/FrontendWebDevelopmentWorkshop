import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss']
})

export class PaisComponent implements OnInit {
  recetas: any;
  ocultarPais: boolean = false;
  recetaActivada: string = '';
  ocultarVolver: boolean = true;
  @Input() nombrePais: string = '';
  @Output() variableEnviada = new EventEmitter<boolean>();

  constructor(private router: Router, private apiService: ApiService) { }

  Receta(accion: string, receta: string) {
    this.recetaActivada = receta;
    if (accion != 'desactivar'){
      this.ocultarPais = true;
      this.ocultarVolverPais(true);
      this.redirigirReceta(receta);
    }
    else{
      this.ocultarPais = false;
      this.ocultarVolverPais(false);
      this.redirigirPais();
    }
  }

  ocultarVolverPais(valor: boolean) {
    this.ocultarVolver = valor
    this.variableEnviada.emit(this.ocultarVolver);
  }

  redirigirReceta(receta: string) {
    this.router.navigate(['/' + this.nombrePais + '/' + receta]); 
  }

  redirigirPais() {
    this.router.navigate(['/' + this.nombrePais]);
  }

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
