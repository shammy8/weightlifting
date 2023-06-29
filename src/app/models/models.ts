export interface Session<T = {}> extends PocketBaseRecord<T> {
  date: string;
  notes: string;
  userId: string;
}

export interface GroupOfSet<T = {}> extends PocketBaseRecord<T> {
  exerciseId: string;
  order: number;
  sessionId: string;
  sets: Set[];
}

export interface Set {
  reps: number | null;
  time: number | null;
  weight: number | null;
  distance: number | null;
}

/**
 * TODO delete this and delete table on pocket base too
 */
export interface SetCollection<T = {}> extends PocketBaseRecord<T> {
  groupOfSetsId: string;
  order: number;
  reps: number;
  time: number;
  weight: number;
}

export interface Exercise<T = {}> extends PocketBaseRecord<T> {
  name: string;
  type: ExerciseType;
  userId: string;
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
