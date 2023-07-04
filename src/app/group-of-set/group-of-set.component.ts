import { Component, Input, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { Exercise, GroupOfSet, emptyPocketBaseRecord } from '../models/models';
import { SetComponent } from '../set/set.component';

@Component({
  selector: 'app-group-of-set',
  standalone: true,
  imports: [NgFor, MatButtonModule, SetComponent],
  template: `
    <hr />
    <p>
      {{ groupOfSet.expand.exerciseId.name }}
    </p>
    <button mat-button (click)="goToExerciseHistory()">History</button>
    <br />
    <ng-container *ngFor="let set of groupOfSet.sets; let i = index">
      {{ i + 1 }}
      <app-set [set]="set" />
    </ng-container>
  `,
  styles: [],
})
export class GroupOfSetComponent {
  @Input({ required: true }) groupOfSet: GroupOfSet<{ exerciseId: Exercise }> =
    {
      ...emptyPocketBaseRecord,
      order: 0,
      exerciseId: '',
      sessionId: '',
      sets: [],
      expand: {
        exerciseId: {
          ...emptyPocketBaseRecord,
          name: '',
          type: 'reps',
          userId: '',
        },
      },
    };

  private readonly _router = inject(Router);

  goToExerciseHistory() {
    this._router.navigate(['exercise-history', this.groupOfSet.exerciseId], {
      queryParamsHandling: 'merge',
    });
  }
}
