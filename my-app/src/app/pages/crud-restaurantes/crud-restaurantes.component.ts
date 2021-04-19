import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-crud-restaurantes',
  templateUrl: './crud-restaurantes.component.html',
  styleUrls: ['./crud-restaurantes.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
})
export class CrudRestaurantesComponent implements OnInit {

  datosRestaurante = [
    {
      nombreRestaurante: 'McDonalds',
      descripcionRestaurante: 'Vende Hamburguesas y Papitas',
    },
    {
      nombreRestaurante: 'KFC',
      descripcionRestaurante: 'Vende Pollito de verdad por que les y Papitas',
    },
    {
      nombreRestaurante: 'Burguer King',
      descripcionRestaurante: 'Vende Hamburguesas y Papitas',
    },
  ]

  constructor( config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  /* Modal Agregar Restaurante */
  modalAddRestaurante(content) {
    this.modalService.open(content, { centered: true });
  }

  /* Modal Editar Restaurante */
  modalEditRestaurante(contentEdit) {
    this.modalService.open(contentEdit, { centered: true });
  }


  ngOnInit(): void {
  }

}
