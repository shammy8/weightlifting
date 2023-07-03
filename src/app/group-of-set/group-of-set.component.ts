import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

import { Exercise, GroupOfSet } from '../models/models';
import { SetComponent } from '../set/set.component';

@Component({
  selector: 'app-group-of-set',
  standalone: true,
  imports: [NgFor, SetComponent],
  template: `
    <p>
      {{ groupOfSet.expand.exerciseId.name }}
    </p>
    <button (click)="goToExerciseHistory()">History</button>
    <br />
    <ng-container *ngFor="let set of groupOfSet.sets; let i = index">
      {{ i + 1 }}
      <app-set [set]="set" />
    </ng-container>
  `,
  styles: [],
})
export class GroupOfSetComponent {
  private readonly _matBottomSheetRef: MatBottomSheetRef<
    GroupOfSetComponent,
    GroupOfSetModalDismissData
  > = inject(MatBottomSheetRef);
  groupOfSet: GroupOfSet<{ exerciseId: Exercise }> = inject(
    MAT_BOTTOM_SHEET_DATA
  );

  goToExerciseHistory() {
    this._matBottomSheetRef.dismiss({ goToExerciseHistoryWithId: this.groupOfSet.exerciseId });
  }
}

export interface GroupOfSetModalDismissData {
  goToExerciseHistoryWithId?: string;
  newGroupOfSetData?: GroupOfSet;
}
