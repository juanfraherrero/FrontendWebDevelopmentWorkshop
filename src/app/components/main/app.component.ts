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
  PaisActivado: string = '';

  constructor(private router: Router, private apiService: ApiService) { }

  activarPais(accion: string, pais: string) {
    if (accion != 'desactivar'){
      this.ocultarInicio = true;
      this.PaisActivado = pais;
    }
    else{
      this.ocultarInicio = false;
      this.PaisActivado = '';
    }
  }

  redirigirDetalle(pais: string) {
    this.router.navigate(['/' + pais]); // Navega a la ruta '/detalle' con el ID como parámetro
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
