import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSysComponent } from './footer-sys.component';

describe('FooterSysComponent', () => {
  let component: FooterSysComponent;
  let fixture: ComponentFixture<FooterSysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterSysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
