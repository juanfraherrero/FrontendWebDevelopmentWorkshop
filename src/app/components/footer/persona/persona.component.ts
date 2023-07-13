import { Component, Input } from '@angular/core';
import PersonaFooter from '../../../interfaces/persona-footer';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent {
  @Input() persona: PersonaFooter = {} as PersonaFooter;
}
