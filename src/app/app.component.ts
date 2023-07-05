import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'recetas-paises';
  datos: any;

  constructor(private apiService: ApiService) { }

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
