import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class APIService {
  public url: string;
  constructor( public http: HttpClient ) {
    this.url = 'http://localhost:3000/';
   }
   //obtener productos
   getRestaurante(): Observable<any>{
      return this.http.get(this.url+'getRestaurantes');
   }

   createRestaurant(restaurant: any): Observable<any>{
  return this.http.post(this.url+'crearRestaurant', restaurant);
}

}
