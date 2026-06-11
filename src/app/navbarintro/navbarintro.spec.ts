import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbarintro } from './navbarintro';

describe('Navbarintro', () => {
  let component: Navbarintro;
  let fixture: ComponentFixture<Navbarintro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbarintro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbarintro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
