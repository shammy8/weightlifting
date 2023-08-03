import { Injectable } from '@angular/core';

import 'cross-fetch/polyfill';

import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class PocketBaseInstanceService {
  readonly pb = new PocketBase('http://127.0.0.1:8090');
}
