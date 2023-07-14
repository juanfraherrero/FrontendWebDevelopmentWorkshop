import { Component, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute,Router } from '@angular/router';

import Ingredient from '../../interfaces/ingredient';

@Component({
    selector: 'app-info-ingr',
    templateUrl: './info-ingr.component.html',
    styleUrls: ['./info-ingr.component.scss']
})

export class infoIngrComponent{
    @Input() ingrediente: Ingredient = {} as Ingredient
}