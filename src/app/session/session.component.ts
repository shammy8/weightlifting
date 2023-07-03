import { Component, Input, inject } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';

import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

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
import { take } from 'rxjs';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [NgFor, MatBottomSheetModule, DatePipe, ShortenSetsPipe],
  template: `
    <p>{{ session.date | date }}</p>
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

  @Input() set sessionId(id: string) {
    this.pbService.getSessionsWithGroupOfSetsAndExercise(id).then((session) => {
      this.session = session;
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
