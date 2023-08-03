import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Set, emptyPocketBaseRecord } from '../models/models';

/**
 * TODO: are we using this
 */
@Component({
  selector: 'app-set',
  standalone: true,
  imports: [CommonModule],
  template: `
    Weight: {{ set.weight }}, Reps: {{ set.reps }}, Time: {{ set.time }}
    <br />
  `,
  styles: [],
})
export class SetComponent {
  @Input({ required: true }) set: Set = {
    ...emptyPocketBaseRecord,
    distance: 0,
    reps: 0,
    time: 0,
    weight: 0,
    painScore: 0,
    note: null,
  };
}
