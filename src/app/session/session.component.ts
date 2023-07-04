import {
  Component,
  Input,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { DateTime } from 'luxon';

import { PocketBaseService } from '../pocket-base.service';
import {
  Exercise,
  GroupOfSet,
  Session,
  emptyPocketBaseRecord,
} from '../models/models';
import { GroupOfSetComponent } from '../group-of-set/group-of-set.component';
import { ShortenSetsPipe } from '../pipes/shorten-sets.pipe';
import { SessionSelectCalendarComponent } from '../session-select-calendar/session-select-calendar.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-session',
  standalone: true,
  template: `
    <app-session-select-calendar
      type="datepicker"
      [initialDate]="sessionDate()"
    />

    {{ session().notes }}

    <p
      *ngFor="
        let groupOfSet of session().expand['groupOfSets(sessionId)'];
        let i = index
      "
      (click)="onOpenGroupOfSetModal(i)"
    >
      {{ groupOfSet.expand.exerciseId.name }}
      <br />
      {{ groupOfSet.sets | shortenSets : groupOfSet.expand.exerciseId.type }}
    </p>

    <app-group-of-set
      *ngIf="groupOfSetSelected()"
      [groupOfSet]="groupOfSetSelected()!"
    />
  `,
  styles: [],
  imports: [
    NgFor,
    NgIf,
    MatBottomSheetModule,
    ShortenSetsPipe,
    SessionSelectCalendarComponent,
    GroupOfSetComponent,
  ],
})
export class SessionComponent {
  private readonly _pbService = inject(PocketBaseService);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  session: WritableSignal<
    Session<{
      'groupOfSets(sessionId)': GroupOfSet<{ exerciseId: Exercise }>[];
    }>
  > = signal({
    ...emptyPocketBaseRecord,
    date: '',
    notes: '',
    userId: '',
    expand: { 'groupOfSets(sessionId)': [] },
  });

  sessionDate: Signal<DateTime | null> = computed(() =>
    DateTime.fromSQL(this.session().date)
  );

  groupOfSetIndex: WritableSignal<number | null> = signal(null);

  groupOfSetSelected = computed(() =>
    typeof this.groupOfSetIndex() === 'number'
      ? this.session().expand['groupOfSets(sessionId)'][this.groupOfSetIndex()!]
      : null
  );

  /**
   * The sessionIdParam param from the router
   */
  @Input() set sessionIdParam(id: string) {
    this._pbService
      .getSessionsWithGroupOfSetsAndExercise(id)
      .then((session) => this.session.set(session));
  }

  /**
   * The groupOfSetIndexParam query param from the router
   */
  @Input() set groupOfSetIndexParam(id: string) {
    this.groupOfSetIndex.set(+id);
  }

  onOpenGroupOfSetModal(groupOfSetIndex: number) {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { groupOfSetIndexParam: groupOfSetIndex  },
    });
  }
}
