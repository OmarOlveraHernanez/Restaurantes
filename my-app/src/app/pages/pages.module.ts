import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { ResenasComponent } from './resenas/resenas.component';
import { CrudRestaurantesComponent } from './crud-restaurantes/crud-restaurantes.component';
import { CrudCategoriasComponent } from './crud-categorias/crud-categorias.component';



@NgModule({
  declarations: [
    HomeComponent,
    ResenasComponent,
    CrudRestaurantesComponent,
    CrudCategoriasComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class PagesModule { }
