import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  paisActual: string = ''; 
  recetaActual: string = '';

  constructor(private http: HttpClient) { }

  getDatos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recipes`);
  }

  getRecetasPais(pais:string): Observable<any> {
    this.paisActual = pais;
    return this.http.get<any>(`${this.apiUrl}/recipes/${pais}`);
  }

  getReceta(receta:string): Observable<any> {
    this.recetaActual = receta;
    return this.http.get<any>(`${this.apiUrl}/recipes/${this.paisActual}/${receta}`);
  }

  deleteReceta(): void {
    this.http.delete<any>(`${this.apiUrl}/recipes/${this.paisActual}/${this.recetaActual}`).subscribe(
      () => {
        console.log('La receta se eliminó correctamente.');
      },
      (error) => {
        console.error('Error al eliminar la receta:', error);
      }
    );
  }

  updateReceta(modificaciones: any): void {
    this.http.put<any>(`${this.apiUrl}/recipes/${this.paisActual}/${this.recetaActual}`, modificaciones).subscribe(
      () => {
        console.log('La receta se eliminó correctamente.');
      },
      (error) => {
        console.error('Error al eliminar la receta:', error);
      }
    );
  }

  // postDatos(datos: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/datos`, datos);
  // }
}
