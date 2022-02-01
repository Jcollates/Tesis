import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProvedoresComponent } from './gestion-provedores.component';

describe('GestionProvedoresComponent', () => {
  let component: GestionProvedoresComponent;
  let fixture: ComponentFixture<GestionProvedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProvedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProvedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
