import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInventarioProductsComponent } from './gestion-inventario-products.component';

describe('GestionInventarioProductsComponent', () => {
  let component: GestionInventarioProductsComponent;
  let fixture: ComponentFixture<GestionInventarioProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionInventarioProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionInventarioProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
