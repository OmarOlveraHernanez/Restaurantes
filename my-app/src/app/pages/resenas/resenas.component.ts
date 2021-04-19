import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styleUrls: ['./resenas.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
})
export class ResenasComponent implements OnInit {

  resenasRestaurantes = [
    {
      email: 'peli@peli.com',
      resena: 'Muy buen restaurante',
      rating: '5',
      fechaCreacion: '21-05-2018'
    },
    {
      email: 'peli2@peli.com',
      resena: 'Muy buen restaurante',
      rating: '3',
      fechaCreacion: '22-02-2016'
    },
    {
      email: 'peli3@peli.com',
      resena: 'Muy buen restaurante',
      rating: '4',
      fechaCreacion: '21-05-2017'
    },
  ]

  constructor(config: NgbModalConfig, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  } 
  /* Modal Reseñas */
  modalResenas(content) {
    this.modalService.open(content, { centered: true });
  }

}
