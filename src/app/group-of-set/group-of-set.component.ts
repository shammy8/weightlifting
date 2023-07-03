import { Component, Input } from '@angular/core';

import { Exercise, GroupOfSet, emptyPocketBaseRecord } from '../models/models';
import { SetComponent } from '../set/set.component';
import { ShortenSetsPipe } from '../pipes/shorten-sets.pipe';

@Component({
  selector: 'app-group-of-set',
  standalone: true,
  imports: [SetComponent, ShortenSetsPipe],
  template: `
    <p>
      {{ groupOfSet.expand.exerciseId.name }}
      <br />
      {{ groupOfSet.sets | shortenSets : groupOfSet.expand.exerciseId.type }}
    </p>
    <!-- <app-set *ngFor="let set of groupOfSet.sets" [set]="set" /> -->
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
