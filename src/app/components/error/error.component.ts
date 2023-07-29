import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})

export class ErrorComponent implements OnInit{

    error: any;
    code: string = '0';
    message: string = '';

    constructor(private route: ActivatedRoute){
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.error = params;
        });
        if (this.error.error instanceof ErrorEvent){
            this.message = `${this.error.error.message}`
        } else {
            this.code = `${this.error.status}`
            this.message = `${this.error.message}`
        }
    }
}