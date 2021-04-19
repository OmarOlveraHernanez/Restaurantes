import { Component, OnInit } from '@angular/core';
import { APIService } from "../../api.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  menuNavigation = [
    { linkId: 1, linkName: 'Ver reseñas', linkUrl: 'resenas' },
  ]

  cardsRestaurantes = [
    {
      imgRestaurante: 'https://logos-marcas.com/wp-content/uploads/2020/04/McDonalds-Emblema.png',
      nombreRestaurante: 'McDonalds',
      descripcionRestaurante: 'Vende Papitas y Hamburguesas',
      categorias: 'Hamburguers',
      rating: '3.2'
    },
    {
      imgRestaurante: 'https://logos-marcas.com/wp-content/uploads/2020/04/KFC-Logotipo-2014%E2%80%932018.png',
      nombreRestaurante: 'KFC',
      descripcionRestaurante: 'Vende Papitas y Hamburguesas',
      categorias: 'Chinese',
      rating: '2.7'
    },
    {
      imgRestaurante: 'https://logos-marcas.com/wp-content/uploads/2020/08/Burger-King-Logo.png',
      nombreRestaurante: 'Burguer King',
      descripcionRestaurante: 'Vende Papitas y Hamburguesas',
      categorias: 'Italian',
      rating: '3.6'
    },
  ]

  constructor(private service: APIService) {

  }


  ngOnInit(): void {
    this.service.getRestaurante().subscribe(data => {
     console.log(data);
   });
  }

}
