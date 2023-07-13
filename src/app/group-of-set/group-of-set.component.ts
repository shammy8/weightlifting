import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Exercise, GroupOfSet, Set, emptyGroupOfSet } from '../models/models';
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
          /* remove the up and down arrow on number inputs */
          &::-webkit-inner-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
        }
      }
    `,
  ],
})
export class GroupOfSetComponent implements OnChanges {
  groupOfSetSignal: WritableSignal<GroupOfSet<{ exerciseId: Exercise }>> =
    signal({ ...emptyGroupOfSet });

  /** Copy of groupOfSet.sets to be used in the form */
  copyOfSets: WritableSignal<Set[]> = signal([]);

  @Input({ required: true }) groupOfSet: GroupOfSet<{ exerciseId: Exercise }> =
    { ...emptyGroupOfSet };

  @Output() updateSets = new EventEmitter<Set[]>();

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['groupOfSet']?.previousValue?.id !==
      changes['groupOfSet']?.currentValue?.id
    ) {
      this.groupOfSetSignal.set(changes['groupOfSet'].currentValue);
      this.copyOfSets.set(
        structuredClone(changes['groupOfSet'].currentValue.sets)
      );
    }
  }

  modelChange(objectSet: { [key: string]: Set }) {
    this._convertSetToArrayAndEmit(objectSet);
  }

  addSet() {
    this.copyOfSets.mutate((oldSets) =>
      oldSets.push({ weight: null, reps: null, distance: null, time: null })
    );
  }

  removeSet(setNumber: number, form: NgForm) {
    this.copyOfSets.mutate((oldSets) => oldSets.splice(setNumber, 1));
    // form doesn't update synchronously after removing a set
    setTimeout(() => this._convertSetToArrayAndEmit(form.value));
  }

  private _convertSetToArrayAndEmit(objectSet: { [key: string]: Set }) {
    const arraySet: Set[] = Object.values(objectSet);
    this.updateSets.emit(arraySet);
  }
}
