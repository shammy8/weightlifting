import {
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';

import { DateTime } from 'luxon';

import { PocketBaseService } from './pocket-base.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatDatepickerModule,
    MatLuxonDateModule,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-toolbar color="primary">
      <span>WL</span>
    </mat-toolbar>

    <div style="width: 500px">
      <mat-calendar
        *ngIf="showCalendar"
        [dateClass]="dateClass"
        (selectedChange)="dateSelected($event)"
      />
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      button.mark-date {
        background: orange;
        border-radius: 100%;
      }
    `,
  ],
})
export class AppComponent {
  pbService = inject(PocketBaseService);
  cdr = inject(ChangeDetectorRef);

  showCalendar = false;

  sessions: any; // TODO

  /**
   * Function used to calculate which date to add a css class to
   * @returns a function which returns the css class to be added to that date
   */
  dateClass: MatCalendarCellClassFunction<DateTime> = () => '';

  async ngOnInit() {
    this.sessions = await this.pbService.getSessionsForUser('xr5783tntg32cuw');
    this.dateClass = this._highlightSessionOnCalendar(this.sessions);
    this.showCalendar = true;
  }

  async dateSelected(date: DateTime | null) {
    if (date === null) {
      return;
    }
    const sessionIdSelected: string | null = this._mapDateToSessionId(date);
    if (sessionIdSelected) {
      const session = await this.pbService.getSession(sessionIdSelected);
      console.log(session)
    } else {
      console.log('open empty session for the input date');
    }
  }

  private _highlightSessionOnCalendar(
    sessions: any
  ): MatCalendarCellClassFunction<DateTime> {
    const allSessionDates: DateTime[] = sessions.items.map((session: any) => {
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
    const matchedSession = this.sessions.items.find((session: any) => {
      const sessionDate = DateTime.fromSQL(session.date).startOf('day');
      return sessionDate.equals(date) ? true : false;
    });
    return matchedSession ? matchedSession.id : null;
  }
}
