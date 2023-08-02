import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import {
  NgClass,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
} from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';

import { debounceTime, Subject, takeUntil } from 'rxjs';

import { Exercise, GroupOfSet, Set, emptyGroupOfSet } from '../models/models';
import { SetComponent } from '../set/set.component';

// TODO clean up file
@Component({
  selector: 'app-group-of-set',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgClass,
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSliderModule,
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
      .taller.mdc-list-item.mdc-list-item--with-one-line {
        /* height of mat-list-item */
        height: 160px;
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
      mat-slider {
        width: calc(100% - 50px);
      }
    `,
  ],
})
export class GroupOfSetComponent implements OnChanges, OnDestroy {
  groupOfSetSignal: WritableSignal<GroupOfSet<{ exerciseId: Exercise }>> =
    signal({ ...emptyGroupOfSet });

  exerciseType = computed(() => this.groupOfSetSignal().expand.exerciseId.type);

  form = this._createForm();

  private readonly _destroy$ = new Subject<void>();

  @Input({ required: true }) groupOfSet: GroupOfSet<{ exerciseId: Exercise }> =
    { ...emptyGroupOfSet };

  @Output() updateSets = new EventEmitter<Set[]>();

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['groupOfSet']?.previousValue?.id !==
      changes['groupOfSet']?.currentValue?.id
    ) {
      this.groupOfSetSignal.set(changes['groupOfSet'].currentValue);
      this.form = this._createForm();
      this._populateForm(changes['groupOfSet'].currentValue.sets);
      this._createSubscriptionForFormChanges();
    }
  }

  addSet() {
    this.form.controls['sets'].push(
      new FormGroup<SetForm>({
        weight: new FormControl(null),
        reps: new FormControl(null),
        distance: new FormControl(null),
        time: new FormControl(null),
        painScore: new FormControl(null, { updateOn: 'change' }),
      }),
    );
  }

  removeSet(setNumber: number) {
    this.form.controls['sets'].removeAt(setNumber);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _createForm() {
    return new FormGroup<GroupOfSetForm>(
      { sets: new FormArray<FormGroup<SetForm>>([]) },
      { updateOn: 'blur' },
    );
  }

  /**
   * Call this after _createForm
   */
  private _populateForm(sets: Set[]) {
    sets.forEach((set) => {
      this.form.controls['sets'].push(
        new FormGroup({
          reps: new FormControl(set.reps),
          weight: new FormControl(set.weight),
          painScore: new FormControl(set.painScore, { updateOn: 'change' }),
          distance: new FormControl(set.distance),
          time: new FormControl(set.time),
        })
      );
    });
  }

  private _createSubscriptionForFormChanges() {
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        // distinctUntilChanged(), // TODO add the comparator function
        takeUntil(this._destroy$),
      )
      .subscribe((formValue) => {
        this.updateSets.emit(formValue.sets as Set[]);
      });
  }
}

interface GroupOfSetForm {
  sets: FormArray<FormGroup<SetForm>>;
}

interface SetForm {
  reps: FormControl<number | null>;
  weight: FormControl<number | null>;
  distance: FormControl<number | null>;
  time: FormControl<number | null>;
  painScore: FormControl<number | null>;
}
