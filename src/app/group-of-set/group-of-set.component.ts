import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { Exercise, GroupOfSet, emptyPocketBaseRecord } from '../models/models';
import { SetComponent } from '../set/set.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// TODO clean up file
@Component({
  selector: 'app-group-of-set',
  standalone: true,
  imports: [
    NgFor,
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
  template: `
    <mat-card>
      <mat-list>
        <!-- Top row for buttons -->
        <mat-list-item class="tall">
          <mat-grid-list cols="9" rowHeight="78px">
            <mat-grid-tile colspan="2">
              <!-- <button mat-icon-button>
                <mat-icon>add_one</mat-icon>
              </button> -->
            </mat-grid-tile>
            <mat-grid-tile colspan="5">
              <a
                extended
                mat-fab
                [routerLink]="['/exercise-history', groupOfSet.exerciseId]"
                queryParamsHandling="merge"
                >History<mat-icon> history </mat-icon></a
              >
            </mat-grid-tile>
            <mat-grid-tile colspan="2">
              <a
                mat-icon-button
                routerLink="./"
                [queryParams]="{ groupOfSetIndexParam: -1 }"
              >
                <mat-icon>close</mat-icon>
              </a>
            </mat-grid-tile>
          </mat-grid-list>
        </mat-list-item>

        <!-- column headers -->
        <mat-list-item>
          <mat-grid-list cols="3" rowHeight="48px">
            <mat-grid-tile>Set </mat-grid-tile>
            <mat-grid-tile>Weight</mat-grid-tile>
            <mat-grid-tile>Reps</mat-grid-tile>
          </mat-grid-list>
        </mat-list-item>

        <!-- the actual set number, weight, reps etc. -->
        <mat-list-item
          *ngFor="let set of groupOfSet.sets; let i = index"
          class="tall"
        >
          <mat-grid-list cols="3" rowHeight="78px">
            <mat-grid-tile> {{ 1 + i }}</mat-grid-tile>
            <mat-grid-tile>
              <mat-form-field appearance="outline">
                <input matInput max="9999" [value]="set.weight" />
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile>
              <mat-form-field appearance="outline">
                <input
                  matInput
                  max="999"
                  min="0"
                  [value]="set.reps"
                /> </mat-form-field
            ></mat-grid-tile>
          </mat-grid-list>
        </mat-list-item>

        <!-- bottom row for add button -->
        <mat-list-item class="tall">
          <mat-grid-list cols="1">
            <mat-grid-tile>
              <button mat-fab color="primary" (click)="addSet.emit()">
                <mat-icon>add</mat-icon>
              </button>
            </mat-grid-tile>
          </mat-grid-list>
        </mat-list-item>
      </mat-list>
    </mat-card>
  `,
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
  @Input({ required: true }) groupOfSet: GroupOfSet<{ exerciseId: Exercise }> =
    {
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
    };

  @Output() addSet = new EventEmitter();
}
