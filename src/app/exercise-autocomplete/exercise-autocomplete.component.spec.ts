import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseAutocompleteComponent } from './exercise-autocomplete.component';

describe('ExerciseAutocompleteComponent', () => {
  let component: ExerciseAutocompleteComponent;
  let fixture: ComponentFixture<ExerciseAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExerciseAutocompleteComponent]
    });
    fixture = TestBed.createComponent(ExerciseAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
