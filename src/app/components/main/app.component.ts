import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'recetas-paises';
  datos: any;
  ocultarInicio: boolean = false;
  paisActivado: string = '';
  clickReceta: boolean = false;

  constructor(private router: Router, private apiService: ApiService) { }

  Pais(accion: string, pais: string) {
    if (accion != 'desactivar'){
      this.ocultarInicio = true;
      this.paisActivado = pais;
      this.redirigirPais(pais);
    }
    else{
      this.ocultarInicio = false;
      this.paisActivado = '';
      this.redirigirMain();
    }
  }

  redirigirPais(pais: string) {
    this.router.navigate(['/' + pais]); 
  }

  redirigirMain() {
    this.router.navigate(['/']);
  }

  recetaSeleccionada(valor: boolean) {
    this.clickReceta = valor;
  }

  ngOnInit(): void {
    this.apiService.getDatos().subscribe(
      (response: any) => {
        this.datos = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
