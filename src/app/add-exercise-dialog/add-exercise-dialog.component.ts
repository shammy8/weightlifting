import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ExerciseType } from '../models/models';

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
  ],
  template: `
    <h1 mat-dialog-title>Add new exercise</h1>
    <form mat-dialog-content #form="ngForm">
      <!-- <p>What's your favorite animal?</p> -->
      <mat-form-field>
        <mat-label>Exercise name</mat-label>
        <!-- TODO add a max length to back end too -->
        <input
          matInput
          name="name"
          [(ngModel)]="newExercise.name"
          required
          maxlength="99"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Exercise type</mat-label>
        <input matInput name="type" [(ngModel)]="newExercise.type" required />
      </mat-form-field>
      {{ newExercise | json }}
    </form>
    <div mat-dialog-actions>
      <button mat-button type="button" mat-dialog-close>Close</button>
      <button
        mat-button
        type="submit"
        [disabled]="!form.valid"
        [mat-dialog-close]="dialogData.exercises"
        cdkFocusInitial
      >
        Add
      </button>
    </div>
  `,
  styles: [],
})
export class AddExerciseDialogComponent {
  private readonly _dialogRef = inject(
    MatDialogRef<AddExerciseDialogComponent>
  );
  dialogData = inject(MAT_DIALOG_DATA);

  newExercise: { name: string; type: ExerciseType } = {
    name: '',
    type: 'reps',
  };

  constructor() {
    console.log(this.dialogData);
  }
}
