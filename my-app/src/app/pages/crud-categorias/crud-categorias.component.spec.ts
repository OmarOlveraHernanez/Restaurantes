import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCategoriasComponent } from './crud-categorias.component';

describe('CrudCategoriasComponent', () => {
  let component: CrudCategoriasComponent;
  let fixture: ComponentFixture<CrudCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
