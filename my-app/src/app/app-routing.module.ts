import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCategoriasComponent } from './pages/crud-categorias/crud-categorias.component';
import { CrudRestaurantesComponent } from './pages/crud-restaurantes/crud-restaurantes.component';
import { HomeComponent } from './pages/home/home.component';
import { ResenasComponent } from './pages/resenas/resenas.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'crud-restaurantes', component: CrudRestaurantesComponent},
  { path: 'crud-categorias', component: CrudCategoriasComponent},
  { path: 'resenas', component: ResenasComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
