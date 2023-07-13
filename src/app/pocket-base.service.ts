import { Injectable } from '@angular/core';

import 'cross-fetch/polyfill';
import PocketBase from 'pocketbase';

import { Exercise, GroupOfSet, Session, Set } from './models/models';

@Injectable({
  providedIn: 'root',
})
export class PocketBaseService {
  pb = new PocketBase('http://127.0.0.1:8090');

  constructor() {}

  // TODO update back end rules
  // TODO how to handle pagination for below getList

  getSessionsForUser(userId: string) {
    console.log('CALL getSessionsForUser');
    return this.pb.collection('sessions').getList<Session>(1, 20, {
      filter: `userId = "${userId}"`,
      // changing fields/expand property means the <Session> interface will need to be changed too
    });
  }

  getGroupOfSetsWithExerciseAndSession(sessionId: string) {
    console.log('CALL getGroupOfSetsWithExerciseAndSession');
    return this.pb
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
    return this.pb.collection('sessions').getOne<
      Session<{
        'groupOfSets(sessionId)': GroupOfSet<{ exerciseId: Exercise }>[];
      }>
    >(sessionId, {
      expand: 'groupOfSets(sessionId).exerciseId',
      // changing fields/expand property means the generic will need to be changed too
    });
  }

  /** TODO not used, not tested */
  getExercisesForUser(userId: string) {
    console.log('CALL getExercisesForUser');
    return this.pb.collection('exercises').getFullList<Exercise>({
      filter: `userId = "${userId}"`,
      sort: 'name',
    });
  }

  updateSets(groupOfSetId: string, sets: Set[]) {
    console.log('CALL updateSets');
    return this.pb.collection('groupOfSets').update(groupOfSetId, { sets });
  }
}
