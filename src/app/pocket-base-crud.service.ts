/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable, inject } from '@angular/core';

import { Exercise, GroupOfSet, Session, Set } from './models/models';
import { NewExercise } from './add-exercise-dialog/add-exercise-dialog.component';
import { PocketBaseInstanceService } from './pocket-base-instance.service';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PocketBaseCrudService {
  private readonly pbInstanceService = inject(PocketBaseInstanceService);
  private readonly _authService = inject(AuthService);

  // TODO update back end rules

  // TODO how to handle pagination for below getList
  getSessionsForUser() {
    console.log('CALL getSessionsForUser');
    return this.pbInstanceService.pb
      .collection('sessions')
      .getList<Session>(1, 20, {
        filter: `userId = "${this._authService.userRecord()!.id}"`,
        // changing fields/expand property means the <Session> interface will need to be changed too
      });
  }

  createSessionForUser(date: string) {
    console.log('CALL createSessionForUser');
    return this.pbInstanceService.pb
      .collection('sessions')
      .create<Session>({ date, userId: this._authService.userRecord()!.id });
  }

  getGroupOfSetsWithExerciseAndSession(sessionId: string) {
    console.log('CALL getGroupOfSetsWithExerciseAndSession');
    return this.pbInstanceService.pb
      .collection('groupOfSets')
      .getFullList<GroupOfSet<{ exerciseId: Exercise; sessionId: Session }>>({
        filter: `sessionId = "${sessionId}"`,
        sort: 'order',
        expand: 'exerciseId,sessionId',
        // changing fields/expand property means the GroupOfSets<...> interface will need to be changed too
      });
  }

  getSessionsWithGroupOfSetsAndExercise(sessionId: string) {
    console.log('CALL getSessionsWithGroupOfSetsAndExercise');
    return this.pbInstanceService.pb.collection('sessions').getOne<
      Session<{
        'groupOfSets(sessionId)': GroupOfSet<{ exerciseId: Exercise }>[];
      }>
    >(sessionId, {
      expand: 'groupOfSets(sessionId).exerciseId',
      // changing fields/expand property means the generic will need to be changed too
    });
  }

  /** TODO not used, not tested */
  getExercisesForUser() {
    console.log('CALL getExercisesForUser');
    return this.pbInstanceService.pb
      .collection('exercises')
      .getFullList<Exercise>({
        filter: `userId = "${this._authService.userRecord()!.id}"`,
        sort: 'name',
      });
  }

  createNewExercise(newExercise: NewExercise) {
    console.log('CALL createNewExercise');
    return this.pbInstanceService.pb
      .collection('exercises')
      .create({ ...newExercise, userId: this._authService.userRecord()!.id });
  }

  deleteExercise(exerciseId: string) {
    console.log('CALL deleteExercise');
    return this.pbInstanceService.pb.collection('exercises').delete(exerciseId);
  }

  addGroupOfSetToSession(sessionId: string, exerciseId: string, order: number) {
    console.log('CALL addGroupOfSetToSession');
    return this.pbInstanceService.pb.collection('groupOfSets').create({
      sessionId,
      exerciseId,
      order,
      sets: [{ reps: null, time: null, weight: null, distance: null }],
    });
  }

  deleteGroupOfSets(groupOfSetId: string) {
    console.log('CALL deleteGroupOfSets');
    return this.pbInstanceService.pb
      .collection('groupOfSets')
      .delete(groupOfSetId);
  }

  updateSets(groupOfSetId: string, sets: Set[]) {
    console.log('CALL updateSets');
    return this.pbInstanceService.pb
      .collection('groupOfSets')
      .update(groupOfSetId, { sets });
  }
}
