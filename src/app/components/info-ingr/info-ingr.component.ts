import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-info-ingr',
    templateUrl: './info-ingr.component.html',
    styleUrls: ['./info-ingr.component.scss']
})

export class infoIngrComponent{
    @Input() ingredienteForm: FormGroup = new FormGroup({
        nombre: new FormControl(''),
        cantidad: new FormControl(''),
        opcional: new FormControl(false)
    });
}