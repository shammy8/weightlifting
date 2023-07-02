import { Component, Input, inject } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';

import { PocketBaseService } from '../pocket-base.service';
import {
  Exercise,
  GroupOfSet,
  Session,
  emptyPocketBaseRecord,
} from '../models/models';
import { GroupOfSetComponent } from '../group-of-set/group-of-set.component';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [NgFor, GroupOfSetComponent, DatePipe],
  template: `
    <p>{{ session.date | date }}</p>
    {{ session.notes }}
    <ng-container
      *ngFor="let groupOfSet of session.expand['groupOfSets(sessionId)']"
    >
      <app-group-of-set [groupOfSet]="groupOfSet" />
    </ng-container>
  `,
  styles: [],
})
export class SessionComponent {
  pbService = inject(PocketBaseService);

  session: Session<{
    'groupOfSets(sessionId)': GroupOfSet<{ exerciseId: Exercise }>[];
  }> = {
    ...emptyPocketBaseRecord,
    date: '',
    notes: '',
    userId: '',
    expand: { 'groupOfSets(sessionId)': [] },
  };

  @Input() set sessionId(id: string) {
    this.pbService.getSessionsWithGroupOfSetsAndExercise(id).then((session) => {
      this.session = session;
    });
  }
}
