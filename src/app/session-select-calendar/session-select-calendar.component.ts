import {
  Component,
  Input,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';

import { DateTime } from 'luxon';
import { ListResult } from 'pocketbase';

import { PocketBaseService } from '../pocket-base.service';
import { Session } from '../models/models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-session-select-calendar',
  standalone: true,
  imports: [
    NgIf,
    MatDatepickerModule,
    MatLuxonDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="type === 'calendar'">
      <mat-calendar
        *ngIf="showCalendar(); else disabledCalendar"
        [dateClass]="dateClassFn"
        (selectedChange)="dateSelected($event)"
        [selected]="initialDate"
      />

      <ng-template #disabledCalendar>
        <mat-calendar [dateFilter]="disableAllDateFn" />
      </ng-template>
    </ng-container>

    <ng-container *ngIf="type === 'datepicker'">
      <mat-form-field *ngIf="showCalendar(); else disabledCalendar">
        <input
          matInput
          [matDatepicker]="picker"
          [value]="initialDate"
          (dateChange)="dateSelected($event.value)"
        />
        <mat-datepicker-toggle matIconSuffix [for]="picker" />
        <mat-datepicker #picker [dateClass]="dateClassFn" />
      </mat-form-field>

      <ng-template #disabledCalendar>
        <mat-form-field>
          <input matInput />
        </mat-form-field>
      </ng-template>
    </ng-container>
  `,
  styles: [
    `
      mat-calendar {
        min-width: 300px;
        max-width: 500px;
      }
      mat-form-field {
        width: 100%;
      }
      /* TODO change to a dot and don't show when date is selected */
      button.mark-date {
        background: orange;
        border-radius: 100%;
      }
    `,
  ],
})
export class SessionSelectCalendarComponent {
  @Input() type: 'calendar' | 'datepicker' = 'calendar';
  @Input() initialDate: DateTime | null = null;

  private readonly _router = inject(Router);
  private readonly _pbService = inject(PocketBaseService);
  private readonly _autService = inject(AuthService);

  showCalendar = signal(false);

  sessions: ListResult<Session> = {
    totalItems: 0,
    totalPages: 0,
    items: [],
    page: 0,
    perPage: 0,
  };

  /**
   * Function used to calculate which date to add a css class to
   * @returns a function which returns the css class to be added to that date
   */
  dateClassFn: MatCalendarCellClassFunction<DateTime> = () => '';

  disableAllDateFn = () => false;

  async ngOnInit() {
    this.sessions = await this._pbService.getSessionsForUser(
      this._autService.userRecord()!.id
    ); // userRecord() should always be non-null because we require the user to log in before we can use this component
    this.dateClassFn = this._highlightSessionOnCalendar(this.sessions);
    this.showCalendar.set(true);
  }

  async dateSelected(date: DateTime | null) {
    if (date === null) {
      return;
    }
    const sessionIdSelected: string | null = this._mapDateToSessionId(
      this.sessions,
      date
    );
    if (sessionIdSelected) {
      this._router.navigate(['session', sessionIdSelected], {});
    } else {
      console.log('open empty session for the input date', date.toISODate());
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

  private _mapDateToSessionId(sessions: ListResult<Session>, date: DateTime) {
    const matchedSession = sessions.items.find((session) => {
      const sessionDate = DateTime.fromSQL(session.date).startOf('day');
      return sessionDate.equals(date) ? true : false;
    });
    return matchedSession ? matchedSession.id : null;
  }
}
