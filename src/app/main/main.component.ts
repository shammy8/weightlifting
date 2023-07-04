import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SessionSelectCalendarComponent } from '../session-select-calendar/session-select-calendar.component';

@Component({
  standalone: true,
  template: ` <app-session-select-calendar type="calendar" /> 
  <router-outlet/>`,
  styles: [],
  imports: [RouterOutlet, SessionSelectCalendarComponent],
})
export class MainComponent {}
