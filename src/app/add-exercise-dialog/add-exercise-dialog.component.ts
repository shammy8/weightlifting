import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

import { Exercise, ExerciseType } from '../models/models';
import { MatIconModule } from '@angular/material/icon';
import { DuplicateExerciseNameValidator } from '../exercises/duplicate-exercise-name-validator.directive';

@Component({
  selector: 'app-add-exercise-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    DuplicateExerciseNameValidator,
  ],
  template: `
    <h1 mat-dialog-title>Add new exercise</h1>
    <form mat-dialog-content #form="ngForm">
      <mat-form-field>
        <mat-label>Exercise name</mat-label>
        <!-- TODO add a max length to back end too -->
        <input
          matInput
          name="name"
          [(ngModel)]="newExercise.name"
          #nameControl="ngModel"
          required
          maxlength="99"
          [appDuplicateExerciseNameValidator]="dialogData.exercises"
        />
        @if (nameControl.errors?.['required']) {
        <mat-error>Exercise name is required</mat-error>
        } @if (nameControl.errors?.['duplicateExerciseName']) {
        <mat-error>There is already an exercise with this name</mat-error>
        }
        <!-- TODO the mat-error font-size is wrong for some reason -->
      </mat-form-field>

      <!-- <mat-form-field> -->
      <!-- <mat-label>Exercise type</mat-label> -->
      <!-- TODO is it better to create a array of something and loop through all the possible types? -->
      <mat-chip-listbox
        aria-label="Exercise type"
        name="type"
        [(ngModel)]="newExercise.type"
        required
      >
        <mat-chip-option value="reps"
          >reps<mat-icon matChipTrailingIcon
            >fitness_center</mat-icon
          ></mat-chip-option
        >
        <mat-chip-option value="distance"
          >distance<mat-icon matChipTrailingIcon
            >fitness_center</mat-icon
          ></mat-chip-option
        >
        <mat-chip-option value="time"
          >time
          <mat-icon matChipTrailingIcon>fitness_center</mat-icon>
        </mat-chip-option>
      </mat-chip-listbox>
      <!-- TODO change logo for each type -->
      <!-- TODO add description to explain each type -->
    </form>
    <div mat-dialog-actions align="end">
      <button mat-button type="button" mat-dialog-close>Close</button>
      <button
        mat-button
        type="submit"
        [disabled]="!form.valid"
        [mat-dialog-close]="newExercise"
      >
        Add
      </button>
    </div>
  `,
  styles: [],
})
export class AddExerciseDialogComponent {
  //   private readonly _dialogRef = inject(
  //     MatDialogRef<AddExerciseDialogComponent>
  //   );
  dialogData: { exercises: Exercise[] } = inject(MAT_DIALOG_DATA);

  newExercise: NewExercise = {
    name: '',
    type: 'reps',
  };
}

export interface NewExercise {
  name: string;
  type: ExerciseType;
}
