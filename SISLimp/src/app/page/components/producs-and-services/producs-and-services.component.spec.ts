import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducsAndServicesComponent } from './producs-and-services.component';

describe('ProducsAndServicesComponent', () => {
  let component: ProducsAndServicesComponent;
  let fixture: ComponentFixture<ProducsAndServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducsAndServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducsAndServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
