import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamientoCitasComponent } from './agendamiento-citas.component';

describe('AgendamientoCitasComponent', () => {
  let component: AgendamientoCitasComponent;
  let fixture: ComponentFixture<AgendamientoCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamientoCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamientoCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
