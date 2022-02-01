import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesCliComponent } from './services-cli.component';

describe('ServicesCliComponent', () => {
  let component: ServicesCliComponent;
  let fixture: ComponentFixture<ServicesCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesCliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
