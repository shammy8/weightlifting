import {
  Component,
  Input,
  Signal,
  ViewChild,
  WritableSignal,
  computed,
  inject,
  numberAttribute,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { DateTime } from 'luxon';

import { PocketBaseCrudService } from '../pocket-base-crud.service';
import {
  Exercise,
  GroupOfSet,
  Session,
  emptyPocketBaseRecord,
  Set,
} from '../models/models';
import { GroupOfSetComponent } from '../group-of-set/group-of-set.component';
import { ShortenSetsPipe } from '../pipes/shorten-sets.pipe';
import { SessionSelectCalendarComponent } from '../session-select-calendar/session-select-calendar.component';
import { ExerciseAutocompleteComponent } from '../exercise-autocomplete/exercise-autocomplete.component';

@Component({
  selector: 'app-session',
  standalone: true,
  template: `
    @if (firstSessionLoaded() === true) {
    <app-session-select-calendar
      type="datepicker"
      [initialDate]="sessionDate()"
    />
    }

    <div class="session">
      <!-- PB returns notes wrapped in <p> since it is a rich editor field -->
      <!-- TODO should I change this? -->
      @if (session().notes; as notes) {
      <p [innerHTML]="notes" class="notes"></p>
      }

      <mat-nav-list>
        <!-- TODO is track correct? -->
        @for ( groupOfSet of session().expand['groupOfSets(sessionId)']; let i =
        $index ; track groupOfSet.id) {
        <a
          mat-list-item
          routerLinkActive
          #routerLinkActive="routerLinkActive"
          [routerLink]="[]"
          [queryParams]="{ groupOfSetIndexParam: i }"
          [activated]="routerLinkActive.isActive"
        >
          <mat-icon matListItemIcon>
            @switch (groupOfSet.expand.exerciseId.type) {
            <!-- TODO these icons check how to get more material icons  -->
            @case ('reps') { fitness_center } @case ('distance') { send }
            <!-- @case('score') { looks_one } TODO do we need this?-->
            @case ('time') {
            <!-- TODO what should below be?  -->
            <ng-container matListItemIcon>timer</ng-container>
            } @default {
            <!-- TODO what should below be?  -->
            <ng-container matListItemIcon>question_mark</ng-container>
            } }
          </mat-icon>

          <span matListItemTitle>{{ groupOfSet.expand.exerciseId.name }}</span>
          <span matListItemLine>{{
            groupOfSet.sets | shortenSets: groupOfSet.expand.exerciseId.type
          }}</span>

          <span matListItemMeta>
            <button
              mat-icon-button
              (click)="$event.stopPropagation(); $event.preventDefault()"
              [matMenuTriggerFor]="menu"
            >
              <mat-icon>more_vert</mat-icon>
            </button>
          </span>
          <mat-menu #menu>
            <button mat-menu-item (click)="deleteGroupOfSets(groupOfSet.id)">
              Delete
            </button>
          </mat-menu>
        </a>
        }
      </mat-nav-list>

      <app-exercise-autocomplete
        [exercises]="exercises()"
        (exerciseIdSelected)="addGroupOfSetToSession($event)"
      />

      @if (groupOfSetSelected()) {
      <app-group-of-set
        [groupOfSet]="groupOfSetSelected()!"
        (updateSets)="updateSets($event)"
      />
      }
    </div>
  `,
  styles: [
    `
      .session {
        margin-left: auto;
        margin-right: auto;
        max-width: 500px;
        cursor: pointer;
      }
      .notes {
        text-align: center;
      }
    `,
  ],
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ShortenSetsPipe,
    SessionSelectCalendarComponent,
    GroupOfSetComponent,
    ExerciseAutocompleteComponent,
  ],
})
export class SessionComponent {
  @ViewChild(ExerciseAutocompleteComponent)
  exerciseAutocompleteComponent: ExerciseAutocompleteComponent | null = null;

  private readonly _pbService = inject(PocketBaseCrudService);
  private readonly _router = inject(Router);

  session: WritableSignal<
    Session<{
      'groupOfSets(sessionId)': GroupOfSet<{ exerciseId: Exercise }>[];
    }>
  > = signal({
    ...emptyPocketBaseRecord,
    date: DateTime.now().toSQLDate() as string,
    notes: '',
    userId: '',
    expand: { 'groupOfSets(sessionId)': [] },
  });

  sessionDate: Signal<DateTime> = computed(() =>
    DateTime.fromSQL(this.session().date),
  );

  groupOfSetIndex: WritableSignal<number | null> = signal(null);

  exercises: WritableSignal<Exercise[]> = signal([]);

  groupOfSetSelected = computed(
    () =>
      this.session().expand['groupOfSets(sessionId)'][this.groupOfSetIndex()!],
  );

  /**
   * Set to true once first session is loaded from the api. So we don't give a null
   * date to session-select-calendar
   */
  firstSessionLoaded = signal(false);

  /**
   * The sessionIdParam param from the router
   */
  @Input() set sessionIdParam(id: string) {
    this._pbService
      .getOneSessionWithGroupOfSetsAndExercise(id)
      .then((session) => {
        this.session.set(session);
        this.firstSessionLoaded.set(true);
      });
  }

  /**
   * The groupOfSetIndexParam query param from the router
   */
  @Input({ transform: numberAttribute }) set groupOfSetIndexParam(id: number) {
    this.groupOfSetIndex.set(id);
  }

  constructor() {
    this._getExerciseAndSetToExercises();
  }

  async updateSets(sets: Set[]) {
    // TODO handle error
    await this._pbService.updateSets(this.groupOfSetSelected().id, sets);
    this._pbService
      .getOneSessionWithGroupOfSetsAndExercise(this.session().id)
      .then((session) => this.session.set(session));
  }

  async addGroupOfSetToSession(exerciseId: string) {
    const orderOfNewGroupOfSet =
      this.session().expand['groupOfSets(sessionId)'].length;
    await this._pbService.addGroupOfSetToSession(
      this.session().id,
      exerciseId,
      orderOfNewGroupOfSet,
      this.sessionDate().toSQLDate() as string,
    );
    const updatedSession =
      await this._pbService.getOneSessionWithGroupOfSetsAndExercise(
        this.session().id,
      );
    this.session.set(updatedSession);
    this._router.navigate([], {
      queryParams: { groupOfSetIndexParam: orderOfNewGroupOfSet },
    });
    this.exerciseAutocompleteComponent?.setToNull();
  }

  async deleteGroupOfSets(groupOfSetId: string) {
    await this._pbService.deleteGroupOfSets(groupOfSetId);
    const updatedSession =
      await this._pbService.getOneSessionWithGroupOfSetsAndExercise(
        this.session().id,
      );
    this.session.set(updatedSession);
  }

  private async _getExerciseAndSetToExercises() {
    const exercises = await this._pbService.getExercisesForUser();
    this.exercises.set(exercises);
  }
}
