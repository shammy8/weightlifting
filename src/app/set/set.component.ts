import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Set, emptyPocketBaseRecord } from '../models/models';

@Component({
  selector: 'app-set',
  standalone: true,
  imports: [CommonModule],
  template: `<p>
    Weight: {{ set.weight }}, Reps: {{ set.reps }}, Time: {{ set.time }}
  </p>`,
  styles: [],
})
export class SetComponent {
  @Input({ required: true }) set: Set = {
    ...emptyPocketBaseRecord,
    distance: 0,
    reps: 0,
    time: 0,
    weight: 0,
  };
}
