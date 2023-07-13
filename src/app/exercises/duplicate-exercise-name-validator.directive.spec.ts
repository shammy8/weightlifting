import { DuplicateExerciseNameValidator } from './duplicate-exercise-name-validator.directive';

describe('DuplicateExerciseNameValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new DuplicateExerciseNameValidator();
    expect(directive).toBeTruthy();
  });
});
