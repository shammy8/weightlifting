import { Injectable } from '@angular/core';

import 'cross-fetch/polyfill';
import PocketBase from 'pocketbase';

import { Exercise, GroupOfSet, Session } from './models/models';

@Injectable({
  providedIn: 'root',
})
export class PocketBaseService {
  pb = new PocketBase('http://127.0.0.1:8090');

  constructor() {}

  getSessionsForUser(userId: string) {
    return this.pb.collection('sessions').getList<Session>(1, 20, {
      filter: `userId = "${userId}"`,
      // changing fields/expand property means the <Session> interface will need to be changed too
    });
  }

  getGroupOfSetsWithExerciseAndSession(sessionId: string) {
    return this.pb.collection('groupOfSets').getFullList<
      // GroupOfSet<{ exerciseId: Exercise; 'sets(groupsOfSetsId)': Set[] }>
      GroupOfSet<{ exerciseId: Exercise; sessionId: Session }>
    >({
      filter: `sessionId = "${sessionId}"`,
      sort: 'order',
      // expand: 'exerciseId,sets(groupOfSetsId)',
      expand: 'exerciseId,sessionId',
      // changing fields/expand property means the GroupOfSets<...> interface will need to be changed too
    });
  }

  getSessionsWithGroupOfSetsAndExercise(sessionId: string) {
    return this.pb.collection('sessions').getOne<
      Session<{
        'groupOfSets(sessionId)': GroupOfSet<{ exerciseId: Exercise }>[];
      }>
    >(sessionId, {
      expand: 'groupOfSets(sessionId).exerciseId',
      // changing fields/expand property means the generic will need to be changed too
    });
  }
}
