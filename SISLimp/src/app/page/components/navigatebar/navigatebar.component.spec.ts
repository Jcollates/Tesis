import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatebarComponent } from './navigatebar.component';

describe('NavigatebarComponent', () => {
  let component: NavigatebarComponent;
  let fixture: ComponentFixture<NavigatebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigatebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
