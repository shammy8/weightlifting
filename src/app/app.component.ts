import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

import { SessionSelectCalendarComponent } from './session-select-calendar/session-select-calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, SessionSelectCalendarComponent],
  template: `
    <mat-toolbar color="primary">
      <span>WL</span>
    </mat-toolbar>

    <app-session-select-calendar />
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {}
