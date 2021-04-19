import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems= [
    { linkId: 1, linkName: 'Inicio', linkUrl: 'home' },
    { linkId: 2, linkName: 'Agregar Restaurante', linkUrl: 'crud-restaurantes' },
    { linkId: 3, linkName: 'Agregar Categoria', linkUrl: 'crud-categorias' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
