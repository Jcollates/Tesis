import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAllComponent } from './calendar-all.component';

describe('CalendarAllComponent', () => {
  let component: CalendarAllComponent;
  let fixture: ComponentFixture<CalendarAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
