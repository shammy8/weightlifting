import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { take } from 'rxjs';

import { PocketBaseService } from '../pocket-base.service';
import { Exercise } from '../models/models';
import { AuthService } from '../services/auth.service';
import {
  AddExerciseDialogComponent,
  NewExercise,
} from '../add-exercise-dialog/add-exercise-dialog.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
  ],
  template: `
    <!-- TODO message for when there are no exercises, when there is an error -->
    <mat-list>
      <mat-list-item *ngFor="let exercise of exercises()">
        <!-- TODO customise icon for exercise type -->
        <mat-icon matListItemIcon>home</mat-icon>

        <span matListItemTitle> {{ exercise.name }}</span>
        <span matListItemLine> {{ exercise.type }}</span>

        <span matListItemMeta>
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>
        </span>
        <mat-menu #menu>
          <a
            mat-menu-item
            [routerLink]="['/exercises', 'history', exercise.id]"
          >
            <mat-icon>history</mat-icon><span>History</span>
          </a>
          <button mat-menu-item>
            <mat-icon (click)="onDelete(exercise.id)">delete</mat-icon
            ><span>Delete</span>
          </button>
        </mat-menu>
      </mat-list-item>
    </mat-list>
    <button mat-fab (click)="openAddExerciseDialog()">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: [],
})
export class ExercisesComponent {
  private readonly _pbService = inject(PocketBaseService);
  private readonly _autService = inject(AuthService);
  private readonly _dialog = inject(MatDialog);

  exercises: WritableSignal<Exercise[]> = signal([]);

  constructor() {
    this._pbService
      .getExercisesForUser(this._autService.userRecord()!.id)
      .then((exercises) => {
        this.exercises.set(exercises);
      });
    // TODO .error(err => {})
  }

  openAddExerciseDialog() {
    const dialogRef = this._dialog.open<
      AddExerciseDialogComponent,
      { exercises: Exercise[] },
      NewExercise
    >(AddExerciseDialogComponent, {
      data: { exercises: this.exercises() },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((newExercise) => {
        if (!newExercise) {
          return;
        }
        console.log(newExercise);
      });
  }

  onDelete(exerciseId: string) {}
}
