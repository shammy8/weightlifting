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

  getSession(sessionId: string) {
    return this.pb.collection('groupOfSets').getFullList<
      // GroupOfSet<{ exerciseId: Exercise; 'sets(groupsOfSetsId)': Set[] }>
      GroupOfSet<{ exercise_id: Exercise }>
    >({
      filter: `sessionId = "${sessionId}"`,
      sort: 'order',
      // expand: 'exerciseId,sets(groupOfSetsId)',
      expand: 'exerciseId',
      // changing fields/expand property means the GroupOfSets<...> interface will need to be changed too
    });
  }
}
