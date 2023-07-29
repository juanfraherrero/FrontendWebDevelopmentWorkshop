import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { updateComponent } from './components/update/update.component';
import { PaisesComponent } from './components/paises/paises.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { InfoRecetaComponent } from './components/info-receta/info-receta.component';
import { ErrorComponent } from './components/error/error.component'

const routes: Routes = [
  { path: '', component: PaisesComponent},                      // Ruta para paises
  { path: ':pais', component: RecetasComponent},                // Ruta para recetas de un pais
  { path: ':pais/:receta', component: InfoRecetaComponent },    // Ruta para receta de un pais
  { path: 'modify/:pais/:receta', component: updateComponent},  // Ruta para actualizar receta
  { path: 'falied/error/view', component: ErrorComponent}                   // Ruta para errores
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
