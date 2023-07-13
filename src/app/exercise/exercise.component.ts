import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { PocketBaseService } from '../pocket-base.service';
import { Exercise } from '../models/models';
import { AuthService } from '../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  template: `
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
          <a mat-menu-item [routerLink]="['/exercise', 'history', exercise.id]">
            <mat-icon>history</mat-icon><span>History</span>
          </a>
          <button mat-menu-item>
            <mat-icon (click)="onDelete(exercise.id)">delete</mat-icon
            ><span>Delete</span>
          </button>
        </mat-menu>
      </mat-list-item>
    </mat-list>
    <button mat-fab (click)="addExercise()"><mat-icon>add</mat-icon></button>
  `,
  styles: [],
})
export class ExerciseComponent {
  private readonly _pbService = inject(PocketBaseService);
  private readonly _autService = inject(AuthService);

  exercises: WritableSignal<Exercise[]> = signal([]);

  constructor() {
    this._pbService
      .getExercisesForUser(this._autService.userRecord()!.id)
      .then((exercises) => {
        this.exercises.set(exercises);
      });
      // TODO .error(err => {})
  }

  addExercise() {}

  onDelete(exerciseId: string) {}
}
