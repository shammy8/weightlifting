import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

import { DateTime } from 'luxon';

import { SessionSelectCalendarComponent } from '../session-select-calendar/session-select-calendar.component';
import { ExerciseAutocompleteComponent } from '../exercise-autocomplete/exercise-autocomplete.component';
import { Exercise } from '../models/models';
import { PocketBaseCrudService } from '../pocket-base-crud.service';

@Component({
  selector: 'app-add-session',
  standalone: true,
  template: `
    <app-session-select-calendar
      type="datepicker"
      [initialDate]="sessionDate()"
    />

    <div class="add-session">
      <app-exercise-autocomplete
        [exercises]="exercises()"
        (exerciseIdSelected)="addNewSessionAndNavigateToSession($event)"
      />
    </div>
  `,
  imports: [SessionSelectCalendarComponent, ExerciseAutocompleteComponent],
  styles: [
    `
      .add-session {
        margin-left: auto;
        margin-right: auto;
        max-width: 500px;
        cursor: pointer;
      }
    `,
  ],
})
export class AddSessionComponent {
  private readonly _pbService = inject(PocketBaseCrudService);
  private readonly _router = inject(Router);

  sessionDate: WritableSignal<DateTime> = signal(DateTime.now());

  /** date query params */
  @Input({ transform: ISODateToDateTime }) set date(date: DateTime) {
    if (date.isValid) {
      this.sessionDate.set(date);
    }
  }

  exercises: WritableSignal<Exercise[]> = signal([]);

  constructor() {
    this._getExerciseAndSetToExercises();
  }

  async addNewSessionAndNavigateToSession(exerciseId: string) {
    if (this.sessionDate() === null || this.sessionDate()?.toSQL() === null) {
      return;
    }

    // TODO: change below 2 to a transaction when available in pocket base
    const newSession = await this._pbService.createSessionForUser(
      this.sessionDate()?.toSQLDate() as string,
    );

    await this._pbService.addGroupOfSetToSession(
      newSession.id,
      exerciseId,
      0,
      this.sessionDate().toSQLDate() as string,
    );

    this._router.navigate(['session', newSession.id], {
      queryParams: { groupOfSetIndexParam: 0 },
    });
  }

  private async _getExerciseAndSetToExercises() {
    const exercises = await this._pbService.getExercisesForUser();
    this.exercises.set(exercises);
  }
}

function ISODateToDateTime(date: string) {
  return DateTime.fromISO(date);
}
