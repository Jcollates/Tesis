import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoServicesComponent } from './catalogo-services.component';

describe('CatalogoServicesComponent', () => {
  let component: CatalogoServicesComponent;
  let fixture: ComponentFixture<CatalogoServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
