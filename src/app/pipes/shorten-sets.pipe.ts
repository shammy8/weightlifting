import { Pipe, PipeTransform } from '@angular/core';

import { ExerciseType, Set } from '../models/models';

@Pipe({
  name: 'shortenSets',
  pure: true,
  standalone: true,
})
export class ShortenSetsPipe implements PipeTransform {
  transform(sets: Set[], exerciseType: ExerciseType): string | null {
    const noOfSets = sets.length;

    if (noOfSets === 0) {
      return null;
    }

    if (exerciseType === 'reps') {
      let lowest: null | number = null;
      let highest: null | number = null;

      sets.forEach((set) => {
        if (lowest === null && typeof set.reps === 'number') {
          lowest = set.reps;
        }
        if (highest === null && typeof set.reps === 'number') {
          highest = set.reps;
        }

        if (
          typeof set.reps === 'number' &&
          typeof lowest === 'number' &&
          set.reps < lowest
        ) {
          lowest = set.reps;
        }
        if (
          typeof set.reps === 'number' &&
          typeof highest === 'number' &&
          set.reps > highest
        ) {
          highest = set.reps;
        }
      });
      return lowest === highest
        ? `${noOfSets} x ${lowest}`
        : `${noOfSets} x ${lowest}-${highest}`;
    }

    return `${noOfSets} sets`;
  }
}
