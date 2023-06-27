import { Injectable } from '@angular/core';

import 'cross-fetch/polyfill';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class PocketBaseService {
  pb = new PocketBase('http://127.0.0.1:8090');

  constructor() {}

  getSessionsForUser(userId: string) {
    return this.pb.collection('sessions').getList(1, 20, {
      filter: `user_id = "${userId}"`,
      fields: 'id,notes,date',
    });
  }

  getSession(sessionId: string) {
    return this.pb
      .collection('group_of_sets')
      .getFullList({
        filter: `session_id = "${sessionId}"`,
        sort: 'order',
        expand: 'exercise_id',
        fields: 'order,reps,time,weight,expand',
      });
  }
}
