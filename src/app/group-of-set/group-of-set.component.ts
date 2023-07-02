import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

import { Exercise, GroupOfSet, emptyPocketBaseRecord } from '../models/models';
import { SetComponent } from '../set/set.component';

@Component({
  selector: 'app-group-of-set',
  standalone: true,
  imports: [NgFor, SetComponent],
  template: `
    <p>{{ groupOfSet.expand.exerciseId.name }}</p>

    <app-set *ngFor="let set of groupOfSet.sets" [set]="set" />
  `,
  styles: [],
})
export class GroupOfSetComponent {
  @Input({ required: true }) groupOfSet: GroupOfSet<{ exerciseId: Exercise }> =
    {
      ...emptyPocketBaseRecord,
      exerciseId: '',
      order: 0,
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
}
