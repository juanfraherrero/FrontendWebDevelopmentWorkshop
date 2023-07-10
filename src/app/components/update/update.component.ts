import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class updateComponent{

    @Input() receta: any; 

    constructor(private apiService: ApiService, private router: Router) {};

    
}