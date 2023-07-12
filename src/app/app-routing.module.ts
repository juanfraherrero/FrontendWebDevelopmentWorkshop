import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/main/app.component';
import { PaisComponent } from './components/pais/pais.component';
import { RecetaComponent } from './components/receta/receta.component';
import { updateComponent } from './components/update/update.component';
import { PaisesComponent } from './components/paises/paises.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { InfoRecetaComponent } from './components/info-receta/info-receta.component';

const routes: Routes = [
  { path: '', component: PaisesComponent},                      // Ruta para paises
  { path: ':pais', component: RecetasComponent},                // Ruta para recetas de un pais
  { path: ':pais/:receta', component: InfoRecetaComponent },    // Ruta para receta de un pais
  { path: 'update/:pais/:receta', component: updateComponent}   // Ruta para actualizar receta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
