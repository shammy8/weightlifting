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
      filter: `user_id = "${userId}"`,
        // changing fields/expand property means the <Session> interface will need to be changed too
    });
  }

  getSession(sessionId: string) {
    return this.pb
      .collection('group_of_sets')
      .getFullList<
        // GroupOfSet<{ exercise_id: Exercise; 'sets(groups_of_sets_id)': Set[] }>
        GroupOfSet<{ exercise_id: Exercise }>
      >({
        filter: `session_id = "${sessionId}"`,
        sort: 'order',
        // expand: 'exercise_id,sets(group_of_sets_id)',
        expand: 'exercise_id',
        // changing fields/expand property means the GroupOfSets<...> interface will need to be changed too
      });
  }
}
