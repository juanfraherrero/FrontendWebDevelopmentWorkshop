import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/main/app.component';
import { PaisComponent } from './components/pais/pais.component';
import { RecetaComponent } from './components/receta/receta.component';
import { updateComponent } from './components/update/update.component';

const routes: Routes = [
  { path: ':pais', component: PaisComponent }, // Ruta para el detalle con el parámetro ID
  { path: '', component: AppComponent },
  { path: ':pais/:receta', component: RecetaComponent },
  { path: ':pais/:receta', component: updateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
