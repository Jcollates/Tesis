import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoProductsComponent } from './catalogo-products.component';

describe('CatalogoProductsComponent', () => {
  let component: CatalogoProductsComponent;
  let fixture: ComponentFixture<CatalogoProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
