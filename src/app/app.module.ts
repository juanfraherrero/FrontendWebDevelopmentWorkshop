import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/main/app.component';
import { HttpClientModule } from '@angular/common/http';
import { PaisComponent } from './components/pais/pais.component';
import { AppRoutingModule } from './app-routing.module';
import { RecetaComponent } from './components/receta/receta.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { updateComponent } from './components/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    PaisComponent,
    RecetaComponent,
    HeaderBarComponent,
    updateComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
