import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { SessionSelectCalendarComponent } from '../session-select-calendar/session-select-calendar.component';

@Component({
  standalone: true,
  template: `
    <app-session-select-calendar type="calendar" />
    <a mat-raised-button routerLink="/exercises"> Exercises </a>
    <!-- <router-outlet/> -->
  `,
  styles: [],
  imports: [RouterLink, MatButtonModule, SessionSelectCalendarComponent],
})
export class MainComponent {}
