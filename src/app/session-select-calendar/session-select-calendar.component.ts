/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  MatCalendar,
  MatCalendarCellClassFunction,
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';

import { DateTime } from 'luxon';
import { ListResult } from 'pocketbase';

import { PocketBaseCrudService } from '../pocket-base-crud.service';
import { Session } from '../models/models';
import { Subject, takeUntil } from 'rxjs';

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
        [dateClass]="dateClassFn"
        (selectedChange)="dateSelected($event)"
        [selected]="initialDate"
      />
    </ng-container>

    <ng-container *ngIf="type === 'datepicker'">
      <mat-form-field>
        <!-- TODO: changing input does not work for dates not in current shown month  -->
        <input
          matInput
          [matDatepicker]="picker"
          [value]="initialDate"
          (dateChange)="dateSelected($event.value)"
          [min]="minDate"
        />
        <mat-datepicker-toggle matIconSuffix [for]="picker" />
        <mat-datepicker
          #picker
          [dateClass]="dateClassFn"
          (opened)="openDatepicker(picker)"
          (closed)="datepickerClosedAndComponentDestroy$.next()"
        />
      </mat-form-field>
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
      /* TODO change to a dot maybe */
      button.mark-date:not(.mat-calendar-body-active) {
        border: 1px blue solid;
        border-radius: 100%;
      }
    `,
  ],
})
export class SessionSelectCalendarComponent implements OnInit, OnDestroy {
  @Input() type: 'calendar' | 'datepicker' = 'calendar';
  @Input() initialDate: DateTime = DateTime.now();

  @ViewChild(MatCalendar) calendar: MatCalendar<DateTime> | null = null;

  private readonly _router = inject(Router);
  private readonly _pbService = inject(PocketBaseCrudService);

  /** We change the min date to get the datepicker to rerender so it shows which dates has a session */
  minDate: DateTime | null = null;

  /** The current active date which is the date the calendar/datepicker is showing */
  currentActiveDate: DateTime = DateTime.now();

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

  datepickerClosedAndComponentDestroy$ = new Subject<void>();

  async ngOnInit() {
    this.currentActiveDate = DateTime.fromObject({
      year: this.initialDate.year,
      month: this.initialDate.month,
      day: this.initialDate.day,
    });
    this.sessions = await this._pbService.getSessionsForMonth(
      this.currentActiveDate,
    );
    this.dateClassFn = this._highlightSessionOnCalendar(this.sessions);
    setTimeout(() => this.calendar?.updateTodaysDate()); // get the calendar to render the css class on the dates

    this._subscribeToCalendarStateChanges();
  }

  async dateSelected(date: DateTime | null) {
    if (date === null) {
      return;
    }
    // TODO: can change the session router params to take in a date instead, we will first search the database if there
    // is a session for that the date for the user if so we will load that session, if not we will create a new session.
    // Then we can remove mapDateToSessionId method
    const sessionIdSelected: string | null = this._mapDateToSessionId(
      this.sessions,
      date,
    );
    if (sessionIdSelected) {
      this._router.navigate(['session', sessionIdSelected], {});
    } else {
      this._router.navigate(['addSession'], {
        queryParams: { date: date.toISODate() },
      });
    }
  }

  /**
   * When the datepicker is open we subscribe to stateChanges of calendar inside the datepicker. If the month shown is changed
   * (ie the activeDate is changed) we call the api to get all the sessions for that month and add a css class to the dates
   * with a session.
   */
  async openDatepicker(picker: MatDatepicker<DateTime>) {
    setTimeout(() => {
      const calendarInstance = (picker as any)._componentRef.instance._calendar;
      calendarInstance.stateChanges
        .pipe(takeUntil(this.datepickerClosedAndComponentDestroy$))
        .subscribe(() => {
          if (
            !this._hasSameYearAndMonth(
              calendarInstance.activeDate,
              this.currentActiveDate,
            )
          ) {
            this.minDate = DateTime.now().minus({ years: 1000 });
            this.currentActiveDate = calendarInstance.activeDate;
            this._pbService
              .getSessionsForMonth(calendarInstance.activeDate)
              .then((sessions) => {
                this.sessions = sessions;
                this.dateClassFn = this._highlightSessionOnCalendar(
                  this.sessions,
                );
                this.minDate = null;
              });
          }
        });
    });
  }

  ngOnDestroy() {
    console.log('destroy session select calendar');
    this.datepickerClosedAndComponentDestroy$.next();
    this.datepickerClosedAndComponentDestroy$.complete();
  }

  /**
   * Subscribe to stateChanges of calendar. If the month shown is changed (ie the activeDate is changed)
   * we call the api to get all the sessions for that month and add a css class to the dates with a session.
   */
  private _subscribeToCalendarStateChanges() {
    this.calendar?.stateChanges
      .pipe(takeUntil(this.datepickerClosedAndComponentDestroy$))
      .subscribe(() => {
        if (
          !this._hasSameYearAndMonth(
            this.calendar!.activeDate,
            this.currentActiveDate,
          )
        ) {
          this.minDate = DateTime.now().minus({ years: 1000 });
          this.currentActiveDate = this.calendar!.activeDate;
          this._pbService
            .getSessionsForMonth(this.calendar!.activeDate)
            .then((sessions) => {
              this.sessions = sessions;
              this.dateClassFn = this._highlightSessionOnCalendar(
                this.sessions,
              );
              setTimeout(() => {
                this.calendar?.updateTodaysDate();
              });
            });
        }
      });
  }

  private _hasSameYearAndMonth(date1: DateTime, date2: DateTime): boolean {
    return date1.hasSame(date2, 'month') && date1.hasSame(date2, 'year');
  }

  private _highlightSessionOnCalendar(
    sessions: ListResult<Session>,
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
