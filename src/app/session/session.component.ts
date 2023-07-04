import { Component, Input, inject } from '@angular/core';
import { NgFor } from '@angular/common';

import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

import { take } from 'rxjs';
import { DateTime } from 'luxon';

import { PocketBaseService } from '../pocket-base.service';
import {
  Exercise,
  GroupOfSet,
  Session,
  emptyPocketBaseRecord,
} from '../models/models';
import {
  GroupOfSetComponent,
  GroupOfSetModalDismissData,
} from '../group-of-set/group-of-set.component';
import { ShortenSetsPipe } from '../pipes/shorten-sets.pipe';
import { SessionSelectCalendarComponent } from '../session-select-calendar/session-select-calendar.component';

@Component({
  selector: 'app-session',
  standalone: true,
  template: `
    <app-session-select-calendar
      type="datepicker"
      [initialDate]="sessionDate"
    />

    {{ session.notes }}

    <p
      *ngFor="let groupOfSet of session.expand['groupOfSets(sessionId)']"
      (click)="onOpenGroupOfSetModal(groupOfSet)"
    >
      {{ groupOfSet.expand.exerciseId.name }}
      <br />
      {{ groupOfSet.sets | shortenSets : groupOfSet.expand.exerciseId.type }}
    </p>
  `,
  styles: [],
  imports: [
    NgFor,
    MatBottomSheetModule,
    ShortenSetsPipe,
    SessionSelectCalendarComponent,
  ],
})
export class SessionComponent {
  bottomSheet = inject(MatBottomSheet);
  pbService = inject(PocketBaseService);

  session: Session<{
    'groupOfSets(sessionId)': GroupOfSet<{ exerciseId: Exercise }>[];
  }> = {
    ...emptyPocketBaseRecord,
    date: '',
    notes: '',
    userId: '',
    expand: { 'groupOfSets(sessionId)': [] },
  };
  sessionDate: DateTime | null = null;

  /**
   * The sessionId param from the router
   */
  @Input() set sessionId(id: string) {
    this.pbService.getSessionsWithGroupOfSetsAndExercise(id).then((session) => {
      this.session = session;
      this.sessionDate = DateTime.fromSQL(this.session.date);
    });
  }

  onOpenGroupOfSetModal(groupOfSet: GroupOfSet) {
    const bottom: MatBottomSheetRef<
      GroupOfSetComponent,
      GroupOfSetModalDismissData
    > = this.bottomSheet.open(GroupOfSetComponent, {
      data: groupOfSet,
    });

    bottom
      .afterDismissed()
      .pipe(take(1))
      .subscribe((data) => {
        if (data?.goToExerciseHistoryWithId) {
          console.log(
            'fetch exercises with id',
            data.goToExerciseHistoryWithId
          );
        } else if (data?.newGroupOfSetData) {
          console.log('update group of set with', data.newGroupOfSetData);
        }
      });
  }
}
