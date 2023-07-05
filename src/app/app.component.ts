import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'recetas-paises';
  datos: any;

  constructor(private router: Router, private apiService: ApiService) { }

  redirigirDetalle(id: string) {
    this.router.navigate(['/detalle', id]); // Navega a la ruta '/detalle' con el ID como parámetro
  }

  ngOnInit(): void {
    this.apiService.getDatos().subscribe(
      (response) => {
        this.datos = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
