import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  Exercise,
  GroupOfSet,
  emptyPocketBaseRecord,
  Set,
} from '../models/models';
import { SetComponent } from '../set/set.component';

// TODO clean up file
@Component({
  selector: 'app-group-of-set',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    SetComponent,
  ],
  templateUrl: './group-of-set.component.html',
  styles: [
    `
      mat-card {
        margin-left: 10px;
        margin-right: 10px;
      }
      .tall.mdc-list-item.mdc-list-item--with-one-line {
        /* height of mat-list-item */
        height: 80px;
      }
      mat-form-field {
        width: 70px;
        input {
          text-align: center;
        }
      }
    `,
  ],
})
export class GroupOfSetComponent {
  groupOfSetSignal: WritableSignal<GroupOfSet<{ exerciseId: Exercise }>> =
    signal({
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
    });

  /** Copy of groupOfSet.sets to be used in the form */
  copyOfSets: Signal<Set[]> = computed(() =>
    structuredClone(this.groupOfSetSignal().sets)
  );

  @Input({ required: true }) set groupOfSet(
    groupOfSet: GroupOfSet<{ exerciseId: Exercise }>
  ) {
    this.groupOfSetSignal.set(groupOfSet);
  }

  @Output() addSet = new EventEmitter();
  @Output() updateSets = new EventEmitter<Set[]>();

  modelChange(objectSet: { [key: string]: Set }) {
    const arraySet: Set[] = Object.values(objectSet);
    this.updateSets.emit(arraySet);
  }
}
