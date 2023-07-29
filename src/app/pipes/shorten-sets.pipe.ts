import { Pipe, PipeTransform } from '@angular/core';

import { ExerciseType, Set } from '../models/models';

/**
 * A pipe which takes in an array of Set and display the number of sets and reps in a shorten format.
 */
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

      if (lowest === highest) {
        if (lowest === null) {
          return '';
        } else {
          return `${noOfSets} x ${lowest}`;
        }
      } else {
        return `${noOfSets} x ${lowest}-${highest}`;
      }
    }

    return `${noOfSets} set(s)`;
  }
}
