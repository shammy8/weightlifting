import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';

import { Exercise } from '../models/models';

@Component({
  selector: 'app-exercise-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    NgSelectModule,
  ],
  template: `
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">
      <ng-select
        ngModel
        [editableSearchTerm]="true"
        name="exerciseId"
        placeholder="Select an exercise"
      >
        <ng-template ng-header-tmp>
          <span (click)="onAddNewExercise()">Add a new exercise</span>
        </ng-template>
        <!-- TODO track? -->
        @for (exercise of exercises; track exercise.id) {
        <ng-option [value]="exercise.id">
          {{ exercise.name }}
        </ng-option>
        }
      </ng-select>
      <button type="submit" mat-icon-button><mat-icon>add</mat-icon></button>
    </form>
  `,
  styles: [
    `
      form {
        display: flex;
        justify-content: center;
      }
      .ng-select {
        min-width: 300px;
      }
    `,
  ],
})
export class ExerciseAutocompleteComponent {
  @ViewChild(NgSelectComponent) ngSelectComponent!: NgSelectComponent;

  @Input() exercises: Exercise[] = [];
  @Output() exerciseIdSelected = new EventEmitter<string>();

  onSubmit(form: NgForm) {
    if (form.value.exerciseId !== null && form.value.exerciseId !== '') {
      this.exerciseIdSelected.emit(form.value.exerciseId);
    }
  }

  onAddNewExercise() {
    // TODO:
    console.log('add new exercise');
  }

  setToNull() {
    this.ngSelectComponent.handleClearClick();
  }
}
