import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';


import Country from './interfaces/country';
import Recipe from './interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; //definimos la url de la API

  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        // Authorization: 'my-auth-token'
      })
    };

  constructor(private http: HttpClient) { }

  // devuelve los paises con direcciones a sus banderas
  getPaises(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/recipes`)
    .pipe(
      retry(2),                   // intenta obtener 2 veces los datos si falla 
      catchError((error) => {     // si falla, devuelve un array vacio y imprime por consola un error
      console.error('Error al obtener los paises:', error); 
      return [];
      //
      // Podríamos agregar que rediriga a una página de error o algo así para que quede copado
      //
    }));
  }

  // devuelve las recetas de un pais
  getRecetasPais(pais:string): Observable<{recetas:Recipe[]}[]> {
    return this.http.get<{recetas:Recipe[]}[]>(`${this.apiUrl}/recipes/${pais}`)
    .pipe(
      retry(2),
      catchError((error) => {
      console.error('Error al obtener las recetas del pais:', error);
      return [];
      //
      // Podríamos agregar que rediriga a una página de error o algo así para que quede copado
      //
    }));
  }

  // devuelve una receta de un pais
  getReceta(pais:string, receta:string): Observable<{recetas:Recipe[]}[]> {
    return this.http.get<{recetas:Recipe[]}[]>(`${this.apiUrl}/recipes/${pais}/${receta}`)
    .pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al obtener la receta:', error);
        return [];
        //
        // Podríamos agregar que rediriga a una página de error o algo así para que quede copado
        //
      }));
  }

  // elmimina una receta de el pais
  deleteReceta(pais:string, receta:string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/recipes/deleteRecipe/${pais}/${receta}`,{responseType: 'text'})
  }


  updateReceta(pais:string, receta:string, modificaciones: any): void {
    this.http.put<any>(`${this.apiUrl}/recipes/${pais}/${receta}`, modificaciones).subscribe(
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
