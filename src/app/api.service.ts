import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import Country from './interfaces/country';
import Recipe from './interfaces/recipe';
import resAPIRest from './interfaces/resAPIRest';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/recipes'; //definimos la url de la API

  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Cache-Control': 'no-cache'
        // Authorization: 'my-auth-token'
      })
    };

  constructor(private http: HttpClient) { }

  // devuelve los paises con direcciones a sus banderas
  getPaises(): Observable<Country[]> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Country[]>(`${this.apiUrl}/`, { headers })
  }

  // devuelve las recetas de un pais
  getRecetasPais(pais:string): Observable<Recipe[]> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Recipe[]>(`${this.apiUrl}/${pais}`, { headers })
  }

  // devuelve una receta de un pais
  getReceta(pais:string, receta:string): Observable<Recipe> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Recipe>(`${this.apiUrl}/${pais}/${receta}`, { headers })
  }

  // elmimina una receta de el pais
  deleteReceta(pais:string, receta:string): Observable<resAPIRest> {
    return this.http.delete<resAPIRest>(`${this.apiUrl}/${pais}/${receta}`)
  }

  updateReceta(pais:string, receta:string, modificaciones: any): Observable<resAPIRest> {
    return this.http.put<resAPIRest>(`${this.apiUrl}/${pais}/${receta}`, modificaciones)
  }

  insertPais(pais: Country): Observable<resAPIRest> {
    return this.http.post<resAPIRest>(`${this.apiUrl}/`, pais);
  }

  insertReceta(pais: String, receta: Recipe): Observable<resAPIRest>{
    return this.http.post<resAPIRest>(`${this.apiUrl}/${pais}`, receta);
  }

}
