import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crud-categorias',
  templateUrl: './crud-categorias.component.html',
  styleUrls: ['./crud-categorias.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
})
export class CrudCategoriasComponent implements OnInit {

  datosCategoria = [
    {
      nombreCategoria: 'Tailandesa',
      desp: 'xD'
    },
    {
      nombreCategoria: 'Japonesa'
    },
    {
      nombreCategoria: 'Mexicana'
    },
  ]

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }



  /* Modal Agregar Categoria */
  modalAddCategoria(content) {
    this.modalService.open(content, { centered: true });
  }

  /* Modal Editar Categoria */
  modalEditCategoria(contentEdit) {
    this.modalService.open(contentEdit, { centered: true });
  }

  ngOnInit(): void {
  }

}
