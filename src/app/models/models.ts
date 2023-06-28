export interface Session<T = {}> extends PocketBaseRecord<T> {
  date: string;
  notes: string;
  user_id: string;
}

export interface GroupOfSet<T = {}> extends PocketBaseRecord<T> {
  exercise_id: string;
  order: number;
  session_id: string;
}

export interface Set<T = {}> extends PocketBaseRecord<T> {
  group_of_sets_id: string;
  order: number;
  reps: number;
  time: number;
  weight: number;
}

export interface Exercise<T = {}> extends PocketBaseRecord<T> {
  name: string;
  type: ExerciseType;
  user_id: string;
}

// TODO is this better as enum and a Map
export type ExerciseType = 'reps' | 'time' | 'distance' | 'score' | 'note';

// There is a class called Record in pocket base but doesn't allow you to configure the expand
interface PocketBaseRecord<T = {}> {
  collectionId: string;
  collectionName: string;
  /**
   * SQL Date
   */
  created: string;
  id: string;
  /**
   * SQL Date
   */
  updated: number;
  expand: T; // TODO
}
