import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { Exercise } from '../models/models';

@Directive({
  selector: '[appDuplicateExerciseNameValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DuplicateExerciseNameValidator,
      multi: true,
    },
  ],
  standalone: true,
})
export class DuplicateExerciseNameValidator implements Validator {
  @Input({ alias: 'appDuplicateExerciseNameValidator', required: true })
  exercises: Exercise[] = [];

  validate(control: AbstractControl<string, string>): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    for (const exercise of this.exercises) {
      if (exercise.name === control.value.trim()) {
        return { duplicateExerciseName: true };
      }
    }
    return null;
  }
}
