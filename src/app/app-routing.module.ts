import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaisComponent } from './components/pais/pais.component'; // Importa el componente de detalle

const routes: Routes = [
  { path: ':pais', component: PaisComponent }, // Ruta para el detalle con el parámetro ID
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
