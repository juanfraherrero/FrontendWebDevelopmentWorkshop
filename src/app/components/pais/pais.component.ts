import { Component, Input, OnInit} from '@angular/core';

import Country from '../../interfaces/country';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss']
})

export class PaisComponent implements OnInit {
  
  @Input() pais : Country = {} as Country; //recibis el pais 
  

  constructor() { }


  ngOnInit(): void {

  }
}
