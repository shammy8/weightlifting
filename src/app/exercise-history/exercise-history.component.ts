import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { PocketBaseCrudService } from '../pocket-base-crud.service';
import { GroupOfSet } from '../models/models';

@Component({
  standalone: true,
  imports: [JsonPipe],
  template: `
    <p>exercise-history works! {{ exerciseId }}</p>
    <pre>{{ exerciseHistory() | json }}</pre>
  `,
  styles: [],
})
export class ExerciseHistoryComponent implements OnInit {
  private readonly pbService = inject(PocketBaseCrudService);

  exerciseHistory: WritableSignal<GroupOfSet[]> = signal([]);

  /** ExerciseId route param */
  @Input() exerciseId: string = '';

  ngOnInit() {
    this._getExerciseHistoryAndSetToSignal(this.exerciseId);
  }

  private async _getExerciseHistoryAndSetToSignal(exerciseId: string) {
    const exerciseHistory = await this.pbService.getExerciseHistory(exerciseId);
    this.exerciseHistory.set(exerciseHistory);
  }
}
