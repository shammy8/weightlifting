import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSelectCalendarComponent } from './session-select-calendar.component';

describe('SessionSelectCalendarComponent', () => {
  let component: SessionSelectCalendarComponent;
  let fixture: ComponentFixture<SessionSelectCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SessionSelectCalendarComponent]
    });
    fixture = TestBed.createComponent(SessionSelectCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
