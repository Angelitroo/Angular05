import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modificarperfil } from './modificarperfil';

describe('Modificarperfil', () => {
  let component: Modificarperfil;
  let fixture: ComponentFixture<Modificarperfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modificarperfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modificarperfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
