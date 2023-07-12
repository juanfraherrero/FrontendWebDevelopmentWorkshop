import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

import Country from '../../interfaces/country';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss']
})
export class PaisesComponent {
  paises : Country[] = [];
  
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPaises().subscribe( (response: Country[]) => {
        this.paises = response;
      }
    );
  }
}
