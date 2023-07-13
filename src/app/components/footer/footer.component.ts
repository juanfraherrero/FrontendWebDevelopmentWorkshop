import { Component } from '@angular/core';
import creadoresList from '../../../assets/info-footer/creadores.json';
import profesoresList from '../../../assets/info-footer/profesores.json';
import PersonaFooter from '../../interfaces/persona-footer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  creadores: PersonaFooter[] = creadoresList.creadores;
  profesores: PersonaFooter[] = profesoresList.creadores;

  constructor() { }

  ngOnInit(): void {
    console.log(this.creadores);
  }
}
