import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';

import { DateTime } from 'luxon';
import { ListResult } from 'pocketbase';

import { PocketBaseService } from '../pocket-base.service';
import { Session } from '../models/models';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-session-select-calendar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatDatepickerModule,
    MatLuxonDateModule,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-calendar
      *ngIf="showCalendar(); else disabledCalendar"
      [dateClass]="dateClassFn"
      (selectedChange)="dateSelected($event)"
    />

    <ng-template #disabledCalendar>
      <mat-calendar [dateFilter]="disableAllDateFn" />
    </ng-template>

    <router-outlet />
  `,
  styles: [
    `
      mat-calendar {
        min-width: 300px;
        max-width: 500px;
      }
      button.mark-date {
        background: orange;
        border-radius: 100%;
      }
    `,
  ],
})
export class SessionSelectCalendarComponent {
  pbService = inject(PocketBaseService);
  router = inject(Router);

  showCalendar = signal(false);

  sessions: ListResult<Session> | null = null; // TODO

  /**
   * Function used to calculate which date to add a css class to
   * @returns a function which returns the css class to be added to that date
   */
  dateClassFn: MatCalendarCellClassFunction<DateTime> = () => '';

  disableAllDateFn = () => false;

  async ngOnInit() {
    this.sessions = await this.pbService.getSessionsForUser('xr5783tntg32cuw');
    console.log('SESSIONS', this.sessions);
    this.dateClassFn = this._highlightSessionOnCalendar(this.sessions);
    this.showCalendar.set(true);
  }

  async dateSelected(date: DateTime | null) {
    if (date === null) {
      return;
    }
    const sessionIdSelected: string | null = this._mapDateToSessionId(date);
    if (sessionIdSelected) {
      this.router.navigate(['session', sessionIdSelected], {});
    } else {
      console.log('open empty session for the input date');
    }
  }

  private _highlightSessionOnCalendar(
    sessions: ListResult<Session>
  ): MatCalendarCellClassFunction<DateTime> {
    const allSessionDates: DateTime[] = sessions.items.map((session) => {
      return DateTime.fromSQL(session.date).startOf('day');
    });

    return (cellDate: DateTime, view: 'month' | 'year' | 'multi-year') => {
      if (view === 'month') {
        const matchingDate = allSessionDates.find((date) => {
          return cellDate.equals(date);
        });
        if (matchingDate) {
          return 'mark-date';
        }
      }
      return '';
    };
  }

  private _mapDateToSessionId(date: DateTime) {
    const matchedSession = this.sessions?.items.find((session) => {
      const sessionDate = DateTime.fromSQL(session.date).startOf('day');
      return sessionDate.equals(date) ? true : false;
    });
    return matchedSession ? matchedSession.id : null;
  }
}
