import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

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
    <ng-container *ngFor="let set of groupOfSet.sets; let i = index">
      {{ i + 1 }}
      <app-set [set]="set" />
    </ng-container>
  `,
  styles: [],
})
export class GroupOfSetComponent {
  groupOfSet: GroupOfSet<{ exerciseId: Exercise }> = inject(
    MAT_BOTTOM_SHEET_DATA
  );
}
